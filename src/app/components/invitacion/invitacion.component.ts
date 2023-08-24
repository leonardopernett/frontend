import { Component, OnInit ,ElementRef} from '@angular/core';
import { InvitacionService } from './invitacion.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-invitacion',
	templateUrl: './invitacion.component.html',
	styleUrls: ['./invitacion.component.css']
})
export class InvitacionComponent implements OnInit{

	data=[];
	filterUser="";
	user = {
		nombres:'',
		apellidos:'',
		correo:'',
		documento:null
	}
    p=1
	constructor(private invitacions:InvitacionService,private elemento:ElementRef) { }

	ngOnInit(){
		this.getusuarios();
		const input=this.elemento.nativeElement.querySelector("input")
		
	}

	getusuarios(){
		this.invitacions.getusers().subscribe(
			(res:any)=>this.data=res,
			error=>console.log(error)
		)
	}

	deleteuser(id){
		this.invitacions.deleteuser(id).subscribe(
			res=>{
				this.getusuarios()
				Swal.fire(
					'Eliminado',
					'El usuario se ha eliminado correctamente !',
					'success'
				   )
			},
			error=>console.log(error)
		)
	}

	enviarcorreos(correos){
		let correoenviado=JSON.parse(correos.value);
		this.invitacions.enviarcorreo(correoenviado).subscribe(
			res=>{
				//console.log(res)
				
			},
			error=>{Swal.fire(
				'Email Enviados',
				'Se ha enviado correctamente la informacion a los correos !',
				'success'
			   )}
		)
	}

	editUser(data){
        return this.user = {
			nombres:data.nombres,
			apellidos:data.apellidos,
			correo:data.correo,
			documento:null
		}
	}


	exportExcel(){
		return this.invitacions.createExcel(this.data)
	}


	
}