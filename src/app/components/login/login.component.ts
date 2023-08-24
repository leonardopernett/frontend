import {  AfterViewInit,  Component, ElementRef,  OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticateApiService } from "../../api/autenticate-api.service";
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit, AfterViewInit {

    @ViewChild('usuario', { static: false }) usuario: ElementRef;
    @ViewChild('password', { static: false }) password: ElementRef;    
    @ViewChild('secretkey',{static:false}) secretkey:ElementRef

    
    text:string="text"
    passworda:string="password"
    languaje="es"
    errorMessage:string
    isUserPassFieldsError = false
    isLoading = false
    hallowen:boolean
    navidad:boolean
    normal:boolean
    disabled=true
    hideCaptcha=false
    inputValue!:FormGroup
   token!:number;

    constructor(
        private autenticateApi: AutenticateApiService,
        private router: Router,
        private translate:TranslateService,
        private fb:FormBuilder
    ) {
        this.inputValue =  this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]],
            validador:["", [Validators.required]]
         })
        this.translate.setDefaultLang(this.languaje)
     }

    ngOnInit() { 
         
        this.token = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
       this.validarfechasespeciales();
      if(new Date().getMonth() === 11){
           this.snow()
      }

      this.changeicon()
      
    }

    validateClass(field:string){
        return (
          this.inputValue.get(field)?.invalid &&  this.inputValue.get(field)?.touched 
          ? 'is-invalid' 
          : this.inputValue.get(field)?.touched ? 'is-valid' : ''
        )
      }
    
      handlSubmit(){
        if(this.inputValue.invalid){
          return
        }
         const { validador } = this.inputValue.value
        if(this.token !== Number(validador)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:"Captcha Incorrecto",
            })
           return 
        }
    
        this.login()
      }
    
      generarValidator(){
        this.token = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
      }


    validarfechasespeciales(){
        let month=(new Date()).getMonth();
        let monthfinaly=month+1;

        if(monthfinaly == 10){
            this.hallowen=false;
            this.normal=true;  
        }

        if(monthfinaly==12){
            this.navidad=false;
            this.normal=true;  
        }

        if(monthfinaly<10){
            this.normal=true; 
        }

        if(monthfinaly==11){
            this.normal=true; 
        }

    }

    ngAfterViewInit() {
        

       this.usuario.nativeElement.focus()
       
   
    } 
    
  

    login(): void {
        this.errorMessage = undefined;

        if( !this.errorMessage){
            this.isLoading = true;

            this.autenticateApi.login(this.inputValue.get('username').value, this.inputValue.get('password').value)
            .subscribe(autenticated => {
                this.router.navigate(['/app']);                   
                this.isLoading = false
                this.errorMessage = undefined;

            

            }, (error:HttpErrorResponse ) => {
                if (error.status == 401) {
                   
                    this.isLoading = false
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text:error.error.message,
                    })
                }

                if(error.status == 0){
                   
                    this.isLoading = false

                }
            })
        }
    }
    

    showPassword(){
    if(this.password.nativeElement.type ==="password"){
            this.password.nativeElement.type = this.text
     }else {
            this.password.nativeElement.type = this.passworda
     }
    }


    cambiarIdioma(field){
        this.translate.use(field)
    }

    snow() {
            // 1. Defina una plantilla de copo de nieve
            var flake = document.createElement('div');
            // Personaje de copo de nieve ❄❉❅❆✻✼❇❈❊✥✺
            flake.innerHTML = '❆';
            flake.style.cssText = 'position:fixed;color:#fff;';
 
            // Obtiene la altura de la página, que es equivalente a la posición del eje Y cuando caen los copos de nieve
            var documentHieght = window.innerHeight;
            // Obtenga el ancho de la página, use este número para calcular, el valor de la izquierda cuando comienza el copo de nieve
            var documentWidth = window.innerWidth;
 
            // Define la cantidad de milisegundos para generar un copo de nieve
            var millisec = 100;
            // 2, establece el primer temporizador, un temporizador periódico y genera un copo de nieve cada vez (milisegundos);
            setInterval(function() { // Una vez que se carga la página, el temporizador comienza a funcionar
                // Genera aleatoriamente el valor de left al principio de la caída del copo de nieve, que es equivalente a la posición del eje X al principio
                var startLeft = Math.random() * documentWidth;
 
                // Genera aleatoriamente el valor de left al final de la caída del copo de nieve, que es equivalente a la posición del eje X al final
                var endLeft = Math.random() * documentWidth;
 
                // Generar aleatoriamente el tamaño del copo de nieve
                var flakeSize = 10 + 20 * Math.random();
 
                // Genera aleatoriamente la duración de la caída de nieve
                var durationTime = 4000 + 7000 * Math.random();
 
                // Genera aleatoriamente la transparencia al comienzo de la caída del copo de nieve
                var startOpacity = 0.7 + 0.3 * Math.random();
 
                // Genera aleatoriamente la transparencia al final de la caída de los copos de nieve
                var endOpacity = 0.2 + 0.2 * Math.random();
 
                // Clonar una plantilla de copo de nieve
                var cloneFlake:any = flake.cloneNode(true);
 
                // Modifica el estilo por primera vez, define el estilo del copo de nieve clonado
                cloneFlake.style.cssText += `
                        left: ${startLeft}px;
                        opacity: ${startOpacity};
                        font-size:${flakeSize}px;
                        top:-25px;
                            transition:${durationTime}ms;
                    `;
 
                // Empalmado en la página
                document.body.appendChild(cloneFlake);
 
                // Establecer el segundo temporizador, temporizador de una sola vez,
                // Cuando el primer temporizador genera copos de nieve y los muestra en la página, modifique el estilo de los copos de nieve para que se muevan;
                setTimeout(function() {
                    // Modifica el estilo por segunda vez
                    cloneFlake.style.cssText += `
                                left: ${endLeft}px;
                                top:${documentHieght}px;
                                opacity:${endOpacity};
                            `;
 
                    // 4. Configure el tercer temporizador y elimine el copo de nieve cuando caiga.
                    setTimeout(function() {
                        cloneFlake.remove();
                    }, durationTime);
                }, 0);
 
            }, millisec);
        }
        
 changeicon(){
        if(new Date().getMonth() == 11){
            return 'nik-logo-navidad.png'
        }else{
            return 'nik-logo.png'
        }
    }

}