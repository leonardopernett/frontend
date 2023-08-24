import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticateApiService } from "../../api/autenticate-api.service";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cliente, PcrcApiService } from "../../api/pcrc-api.service";
import { UserApiService } from "../../api/user-api.service";
import { StateService } from "../../services/state.service";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { TotalService } from 'src/app/services/total.service';
import { ArticlesApiService } from 'src/app/api/articles-api.service';

@Component({
  selector: 'app-side-sheet',
  templateUrl: './side-sheet.component.html',
  styleUrls: ['./side-sheet.component.css']
})
export class SideSheetComponent implements OnInit {

  public clientes: cliente[];
  public clienteSeleccionado: cliente;
  public pcrcSeleccionado: cliente['pcrcs'][0];
  public userName: string;
  public rol: string;
  public userPcrc$: Observable<cliente[]>;
  public changePcrc: boolean;
  public logoutLoading = false;
  public permisoCopiarLoading = false;
  captcha
  busqueda


  constructor(
    public userApi: UserApiService,
    private PcrcApiService: PcrcApiService,
    public state: StateService,
    public googleAnalytics: googleAnalytics,
    public autenticateApi: AutenticateApiService,
    public router: Router,
    public totalService:TotalService,
    private articlesApi: ArticlesApiService
  ) { }
  
  ngOnInit() {
    this.userName = this.state.getValueOf('user').name
    this.rol = this.state.getValueOf('user').rol 
    /* this.state.newUserPcrc([
      {
          id_dp_clientes: 1,
          cliente: "Administrativos",
          pcrcs: [
              {
                  id_dp_pcrc: 0,
                  pcrc: "ADMINISTRATIVOS",
                  cod_pcrc: "0"
              }
          ]
      }
  ]); */
    this.verificarBusqueda()
  
  }

  verificarBusqueda(){

    this.autenticateApi.validarbusqueda().subscribe(data=>{
      this.busqueda=data[0].estado
  })

  }

  changeCliente(cliente: cliente) {
   
    this.googleAnalytics.setDimension(1, 'cliente', cliente.cliente)
    this.state.newSelectedCliente(cliente)
  }

  changeSubLine(pcrc: cliente['pcrcs'][0]) {
    this.googleAnalytics.setDimension(2, 'pcrc', pcrc.pcrc)
    this.state.newSelectedPcrc(pcrc)
  }

  onPcrcSeleccionado(cliente: cliente) {

    

    localStorage.setItem('selectedClienteId', cliente.id_dp_clientes.toString())
    localStorage.setItem('selectedPcrcId', cliente.pcrcs[0].id_dp_pcrc.toString())

    this.state.newSelectedPcrc(cliente.pcrcs[0])
    this.state.newSelectedCliente(cliente)

      this.articlesApi.totalArticleRequired(this.state.getValueOf('selectedPcrc').id_dp_pcrc,this.state.getValueOf('user').sub).subscribe(data=>{
          
           this.totalService.total.emit(data[0].total)
        
          
  }) 
   
  }

  logOut = () => {
    localStorage.removeItem('selectedClienteId')
    localStorage.removeItem('selectedPcrcId')
    localStorage.removeItem('userpcrc')
    this.logoutLoading = true;
    this.autenticateApi.logOut()
    this.router.navigate(['/'])
  }

  cambiarProteccionDeDatos(){
    this.permisoCopiarLoading = true;
    this.PcrcApiService.putPermisoCopiado(this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString()).pipe(
      tap(result => {
        this.permisoCopiarLoading = false;
        this.state.cambiarProteccionDeDatos(result.puede_copiar)
      })
    ).subscribe()
  }

  

  cambiarBusqueda(busqueda){

    this.articlesApi.accionbusqueda(busqueda).subscribe(data=>{
      this.verificarBusqueda() 
    })

  }

}