import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LdapService } from '../../api/ldap.service';
import Swal from 'sweetalert2';
import { StateService } from '../../services/state.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

	correo
	passwordnuevo
	passwordnuevoconfirmado
	token

	constructor(private state:StateService,private route: ActivatedRoute,private ldap:LdapService,private router: Router) { }

	ngOnInit() {
		
		this.token = this.route.snapshot.queryParamMap.get('token');

		this.ldap.validartoken(this.token).subscribe((data:any)=>{
			
			if(data!=0){
				this.correo=data.email
			}else{
				this.router.navigate(['/login']);
			}
			
			
		})
		
	  }

	  cambiar(){

			if(this.passwordnuevo=="" || this.passwordnuevoconfirmado=="" || this.passwordnuevoconfirmado==null || this.passwordnuevo==null){
	
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No se puede dejar campos vacios'
				  })
	
			}
	
			if(this.passwordnuevo===this.passwordnuevoconfirmado){
				
				this.ldap.resetpasswordLdap(this.correo,this.passwordnuevo,this.token).subscribe(data=>{
	
					Swal.fire({
						icon:'success',
						title: 'Contraseña cambiada con exito',
						showConfirmButton: false,
						timer: 1500
				 
					  })
	
				})

				this.router.navigate(['/login']);
				
			}else{
				
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Las contraseñas no coinciden'
				  })
				
			}
	
		

	  }


}