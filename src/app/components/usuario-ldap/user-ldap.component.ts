import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import { LdapService } from '../../api/ldap.service';

@Component({
	selector: 'app-user-ldap',
	templateUrl: './user-ldap.component.html',
	styleUrls: ['./user-ldap.component.css']
})
export class UserLdapComponent implements OnInit{

	@ViewChild('cerrar', { static: true }) cerrar: ElementRef;

	usuario=""
	usuarios
	generos
	validartabla=1
	documento=""
	password=""
	nombre=""
	correo_personal=""
	fecha_nacimiento=""
	direccion=""
	correo_corporativo=""
	bloqueo=""
	deshabilitar=""
	primer_ingreso=""
	celular=0
	telefono=0
	genero_capturado=1
	formulario
	id
	cambiarcorreopersonal
	cambiarcorreocorporativo
	tipos
	tipo_capturado=1
	actividad

	constructor(private ldap:LdapService) { }

	ngOnInit(){

		this.mostrarusuario()
		this.mostrargenero()
		this.mostrartipo()

	}


	guardarusuario(){

		 if(this.documento=="" || this.password=="" || this.nombre=="" || this.correo_personal=="" || this.genero_capturado==1 || this.tipo_capturado==1 || this.correo_corporativo==""){
			return Swal.fire({
			  icon: 'error',
			  title: 'Oops...',
			  text: 'No se puede dejar campos vacios'
			})
		  }

		  if(this.documento==null || this.password==null  || this.nombre==null  || this.correo_personal==null  || this.genero_capturado==null || this.tipo_capturado==null  || this.correo_corporativo==null ){
			return Swal.fire({
			  icon: 'error',
			  title: 'Oops...',
			  text: 'No se puede dejar campos vacios'
			})
		  }


		    if(!this.validarCorreo(this.correo_corporativo) || !this.validarCorreo(this.correo_personal)){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Formato de correo incorrecto, en alguno de los campos de correo'
				  })

			}

			if(!this.validarNumeros(this.documento)){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Documento solo acepta numeros'
				  })
	
			}

			if(!this.validarNumeros(this.telefono)){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Telefono solo acepta numeros'
				  })
	
			}

			if(!this.validarNumeros(this.celular)){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Celular solo acepta numeros'
				  })
	
			}

			if(this.documento.length!==20){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Codigo debe tener 20 digitos'
				  })

			}

			if(this.documento!="" || this.documento==null){

				this.ldap.validaruserLdap(this.documento).subscribe((data:any)=>{
	
					if(data.length>0){
	
						return Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Ya este usuario existe'
						  })
	
					}else{

						this.ldap.insertarLdap(this.documento,this.password,this.nombre, this.correo_personal,this.genero_capturado,this.fecha_nacimiento, this.direccion, this.correo_corporativo, this.celular, this.telefono,this.tipo_capturado).subscribe(data=>{

							this.cerrar.nativeElement.click();

							Swal.fire({
								icon:'success',
								title: 'Guardado con exito',
								showConfirmButton: false,
								timer: 1500
						 
							  })
				
							this.documento=""
							this.password="" 
							this.nombre="" 
							this.correo_personal="" 
							 this.direccion=""
							 this.correo_corporativo="" 
							   this.celular=0
							   this.telefono=0
							   this.genero_capturado=1
							   this.tipo_capturado==1
							this.mostrarusuario()
				
						})

					}
	
				})
	
			  }
  

	}

	limpiar(){

		this.formulario="registrar"

		const fechaActual = new Date();

		const year = fechaActual.getFullYear();
		let month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
		let day = fechaActual.getDate().toString().padStart(2, '0');

		const fechaFormateada = `${year}-${month}-${day}`;


		this.documento=""
			this.nombre=""
			this.correo_personal=""
			this.direccion=""
			this.correo_corporativo="" 
			this.celular=0
			this.telefono=0
			this.genero_capturado=1
		    this.tipo_capturado==1
			this.fecha_nacimiento=fechaFormateada


	}

	generarcodigo(){

	 this.documento = this.generarNumero20Digitos();
	 
	}

	mostrarusuario(){

		this.ldap.mostrarLdap().subscribe((data:any)=>{
			if(data.length===0){
				this.validartabla=0
			}else{
				this.validartabla=1
			}

			this.usuarios=data
		})

	}

	mostrargenero(){

		this.ldap.generoLdap().subscribe(data=>{
			this.generos=data
		})

	}

	mostrartipo(){

		this.ldap.tipoLdap().subscribe(data=>{
			this.tipos=data
		})

	}

	buscarusuario(){

		if(this.usuario==""){
			return Swal.fire({
			  icon: 'error',
			  title: 'Oops...',
			  text: 'No se puede dejar campo de codigo vacio'
			})
		  }

		  this.ldap.buscarLdap(this.usuario).subscribe((data:any)=>{
			if(data.length===0){
				this.validartabla=0
			}else{
				this.validartabla=1
			}
			this.usuarios=data
			this.usuario=""
		  })

	}

	eliminarusuario(id,documento){

		this.ldap.elimarLdap(id,documento).subscribe((data:any)=>{

			if(data.length===0){
				this.validartabla=0
			}else{
				this.validartabla=1
			}

			this.mostrarusuario()

			Swal.fire({
				icon:'success',
				title: 'Eliminado con exito',
				showConfirmButton: false,
				timer: 1500
		 
			  })

		})

		

	}

	editarusuario(id,nombre,correo_personal,id_genero,fecha_nacimiento,
		direccion,correo_corporativo,celular,telefono,tipo_capturado,actividad){

			this.formulario="editar"
			this.nombre=nombre
			this.correo_personal=correo_personal 
			this.direccion=direccion
			this.correo_corporativo=correo_corporativo 
			this.celular=celular
			this.telefono=telefono
			this.genero_capturado=id_genero
			this.fecha_nacimiento=this.formato_fecha(fecha_nacimiento)
			this.id=id
			this.tipo_capturado=tipo_capturado
			this.actividad=this.formato_fecha(actividad)

	}

	editarusuariobase(){


		if(this.nombre=="" || this.correo_personal=="" || this.genero_capturado==1 || this.tipo_capturado==1 || this.correo_corporativo==""){
			return Swal.fire({
			  icon: 'error',
			  title: 'Oops...',
			  text: 'No se puede dejar campos vacios'
			})
		  }

		  if(  this.nombre==null  || this.correo_personal==null  || this.genero_capturado==null  || this.tipo_capturado==null || this.correo_corporativo==null  ){
			return Swal.fire({
			  icon: 'error',
			  title: 'Oops...',
			  text: 'No se puede dejar campos vacios'
			})
		  }


		    if(!this.validarCorreo(this.correo_corporativo) || !this.validarCorreo(this.correo_personal)){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Formato de correo incorrecto, en alguno de los campos de correo'
				  })

			}

			if(!this.validarNumeros(this.telefono)){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Telefono solo acepta numeros'
				  })
	
			}

			if(!this.validarNumeros(this.celular)){

				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Celular solo acepta numeros'
				  })
	
			}

			this.ldap.editarLdap(this.nombre, this.correo_personal,this.genero_capturado,this.fecha_nacimiento, this.direccion, this.correo_corporativo, this.celular, this.telefono,this.id,this.tipo_capturado,this.actividad).subscribe(data=>{

				this.cerrar.nativeElement.click();

				Swal.fire({
					icon:'success',
					title: 'Editado con exito',
					showConfirmButton: false,
					timer: 1500
			 
				  })

				this.mostrarusuario()
	
			})



	}

	desbloquearbtn(id,desbloquear){

		let desbloquearnew

		if(desbloquear==0){
			desbloquearnew=3
		}else{
			desbloquearnew=0
		}

		this.ldap.desbloquear(id,desbloquearnew).subscribe(data=>{
			this.mostrarusuario()
		})

	}

	   validarCorreo(correo) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(correo);
	  }

	   validarNumeros(numeros) {
		const regex = /^[0-9]+$/;
		return regex.test(numeros);
	  }

	   generarNumero20Digitos(): string {
		let numero = '';
		for (let i = 0; i < 20; i++) {
		  const digito = Math.floor(Math.random() * 10);
		  numero += digito.toString();
		}
		return numero;
	  }
	  
	  resetEmail(tipo_reset){

		if(tipo_reset==1){
			this.ldap.reset(this.cambiarcorreopersonal).subscribe(data=>{

				Swal.fire({
					icon:'success',
					title: 'Correo enviado',
					showConfirmButton: false,
					timer: 1500
			 
				  })

			})
		}

		if(tipo_reset==2){
			this.ldap.reset(this.cambiarcorreocorporativo).subscribe(data=>{

				Swal.fire({
					icon:'success',
					title: 'Correo enviado',
					showConfirmButton: false,
					timer: 1500
			 
				  })

			})
		}

	  }

	  obtenercorreo(correo_personal,correo_corporativo){

			this.cambiarcorreopersonal=correo_personal
			this.cambiarcorreocorporativo=correo_corporativo

	  }

	  formato_fecha(fechas){

		const fecha = new Date(fechas);

			const year = fecha.getFullYear();
			let month = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
			let day = fecha.getDate().toString().padStart(2, '0'); 

			return `${year}-${month}-${day}`;

	  }

}