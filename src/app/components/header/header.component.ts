import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StateService } from "../../services/state.service";
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { map, switchMap, take, tap } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import { formatDistance} from 'date-fns'
import { es } from 'date-fns/locale'
import { UserApiService } from '../../api/user-api.service';
import { DOCUMENT } from '@angular/common';
import { interval, pipe, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core'
import { PreturnoService } from 'src/app/api/preturno.service';
import { AutenticateApiService } from '../../api/autenticate-api.service';
import {  Router } from '@angular/router';
import { LdapService } from '../../api/ldap.service';
import Swal from 'sweetalert2';
import { PerfilApiService } from 'src/app/api/perfil-api.service';

/* import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService(); */

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy{ 

    @ViewChild('demoModalButton', { static: false }) demoModalButton: ElementRef;
    @ViewChild('cerrar', { static: true }) cerrar: ElementRef;
    
    public userName: string;
    public disabled = true
    notificacion:any = []
    page:number= 1
    usuarioBase:any 
    notificar = []
    notifico= []
    activeLang='es'
    user_id:any 
    suscription:Subscription
    totalvalidado;
    totalvalidadomultiple;
    public logoutLoading = false;
    passwordnuevo;
    passwordnuevoconfirmado;
    avatar
    avatarseleccionado
    avatarurl
    

    constructor(
        public state:StateService,
        public articlesWebSockets:ArticlesWebSocketsService,
        public socketService:SocketService,
        public userApiService:UserApiService,
        @Inject(DOCUMENT) private document:Document,
        private render:Renderer2,
        private translate:TranslateService,
        public preturno:PreturnoService,
        public autenticateApi: AutenticateApiService,
        public router: Router,
        private ldap:LdapService,
        private perfil:PerfilApiService
        
    ) { 
        this.translate.setDefaultLang(this.activeLang)
        this.preturno.totalPreturno.subscribe(resp=>{
            this.total=resp
        })

        this.preturno.totalPreturnomultiple.subscribe(resp=>{
            this.total=resp
        })

        
        
      } 

    ngOnInit() { 

        this.mostraravatar()

        /* const nuevosDatosUsuario:any = {
            name: "daniel",
            rol: "publicador",
            sub: "1102850540",
            permiso: []
          };
          
         
    this.state.setUser(nuevosDatosUsuario);
    console.log(this.state.getValueOf('user'))  */

        this.perfil.avatarTodos().subscribe(data=>{
            this.avatar=data
        })

        this.ldap.ingresoLdap(this.state.getValueOf('user').sub).subscribe((data:any)=>{
            if(data.length==0){
            }else{
                this.ldap.primeringresoLdap(this.state.getValueOf('user').sub).subscribe(data=>{
                    
                    if(data[0].primer_ingreso==1){
                        this.demoModalButton.nativeElement.click();
                    }

                })
            }
        })

        if(this.state.getValueOf('user').sub  == undefined){
          return 
        } else {
            this.getNotificaciones()  
            this.total() 
        }
     
    }
    total(){

        if(this.state.getValueOf('selectedPcrc')!=null){

        this.preturno.total(this.state.getValueOf('selectedPcrc').id_dp_pcrc,this.state.getValueOf('user').sub).subscribe((data:any)=>{
        this.totalvalidado=data
        })

         }
    
      }
    
    ngOnDestroy(){
       this.suscription.unsubscribe()
    }

     getNotificaciones(){

        if(this.state.getValueOf('selectedPcrc')!=null){

         try {
            if(this.state.getValueOf('user').sub != null ){
                this.suscription =  this.socketService.getNotificacionesByDocument(this.state.getValueOf('user').sub).subscribe(
                    (res:any) => {
                        this.user_id = res.id                
                        if(this.state.getValueOf('user').sub){
                           this.socketService.getNotificaciones(this.user_id).subscribe(
                               (noty:any) => { 
                                    this.notificacion  = noty.filter( n => n.base_id === this.state.getValueOf('selectedPcrc').id_dp_pcrc)                                
                                    this.notificar     =  this.notificacion.map( n  => n.leidos == 0)
                                    this.notifico      =  this.notificar.filter(n => n == true)
                            
                                }
                           
                             );
                         }
                        
                      }
                 )  
             }
         } catch (error) {
            return  
         }
           
     } 

    }

     ngAfterViewInit(){
        
      /*    interval(60000).pipe(tap( () => {

            this.getNotificaciones()
         })).subscribe() */
    }

    dateFormat(date:Date){
       return  formatDistance(new Date(date), new Date() ,{addSuffix:true, locale:es })
    }

    toggleSideSheet(){
        this.state.toogleSideSheet()
    }

    toggleNotificatons(){
        this.articlesWebSockets.togleNotifications()
    }

   leido(notifica:any){
        this.socketService.getNotificacionesByDocument(this.state.getValueOf('user').sub). pipe(
            map((res:any) => res.id),
            switchMap(id => this.socketService.getNotificacionesLeidas({
                documento:id,
                id_notificacion: notifica.id
            }))).subscribe( ()=> this.getNotificaciones() )
    }

     cambiarIdioma(lang){
          this.activeLang = lang
          this.translate.use(lang) 
    }

    desabilitar(){
      this.render.addClass(this.document.documentElement,'hide')
    }

    cambiarpassword(){

        if(this.passwordnuevo=="" || this.passwordnuevoconfirmado=="" || this.passwordnuevoconfirmado==null || this.passwordnuevo==null){

            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se puede dejar campos vacios'
              })

        }

        if(this.passwordnuevo===this.passwordnuevoconfirmado){
            
            this.ldap.cambiarpasswordLdap(this.state.getValueOf('user').sub,this.passwordnuevo).subscribe(data=>{

                this.cerrar.nativeElement.click();

                Swal.fire({
                    icon:'success',
                    title: 'Contraseña cambiada con exito',
                    showConfirmButton: false,
                    timer: 1500
             
                  })

            })
            
        }else{
            
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Las contraseñas no coinciden'
              })
            
        }

    }

    logOut = () => {
        localStorage.removeItem('selectedClienteId')
        localStorage.removeItem('selectedPcrcId')
        localStorage.removeItem('userpcrc')
        this.logoutLoading = true;
        this.autenticateApi.logOut()
        this.router.navigate(['/'])
      }

      seleccionado(id,url){

        this.avatarseleccionado=id
        this.avatarurl=url

        this.perfil.guardaravatar(id,this.state.getValueOf('user').sub).subscribe()

      }
  
    searchData(value:string){
      console.log(value)
    }

    mostraravatar(){
        console.log(this.state.getValueOf('user').sub)
        this.perfil.mostraravatar(this.state.getValueOf('user').sub).subscribe((data:any)=>{
            console.log(this.avatarurl)
            this.avatarseleccionado=data[0].id
            this.avatarurl=data[0].url
            console.log(this.avatarurl)
        })

    }
  

}
