import { Component, OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { RegisterUserExternoService } from './register-mail.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-register-mail',
	templateUrl: './register-mail.component.html',
	styleUrls: ['./register-mail.component.css']
})
export class RegisterMailComponent implements OnInit {

	registerform:FormGroup;
    isEmail= /\S+@\S+\.\S+/;
    isPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
	constructor(
		private activeRoute:ActivatedRoute,private router:Router,private registro:RegisterUserExternoService,
		private fb:FormBuilder
		
		) {
		
	 }

	 ngOnInit(): void {
		this.initForm()
		if(this.activeRoute.snapshot.params){
		  const {token} = this.activeRoute.snapshot.params
		  if(!token){
			this.router.navigate(['/'])  
		  }
		  localStorage.setItem('token', JSON.stringify(token))
		}
	  }


	 isValidate(field:string){
		 const validateForm = this.registerform.get(field)
		 return (!validateForm.valid && validateForm.touched) ? 'is-invalid': validateForm.touched ? 'is-valid': ''
	 }

	 initForm(){
		 this.registerform = this.fb.group({
			nombres:['', [Validators.required]],
			apellidos:['', [Validators.required]],
			correo:['', [Validators.required,Validators.pattern(this.isEmail)]],
			password:['', [Validators.required,Validators.minLength(8),Validators.pattern(this.isPassword)]],
		 })
	 }

	

	 registrarusuario(){
		if(this.registerform.valid){
			console.log(this.registerform.value)
			this.registro.registrarusuario(this.registerform.value).subscribe(
				()=>{
                   Swal.fire(
					'Exito',
					'El usuario se registro exitosamenete ',
					'success'
				   )
				},
				()=>{
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Hubo un error a momento dle registro del usuario',
						
					  })	
				}

			)
			this.registerform.reset()
		}else{	
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'No se pudo registrar el usuario por favor verificar los campos',
				
			  })		
		}
			
		
	 }

}