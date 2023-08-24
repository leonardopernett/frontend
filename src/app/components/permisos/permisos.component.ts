import { Component, OnInit} from '@angular/core';
import { PermisosService } from '../../api/permisos.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class permisosComponent implements OnInit {


  cedula=""
  usuario
  categoria
  permiso
  idusuario
  roles
  verificar=false
  rol
  cont
  rolcreado=""
  check=false
  roleditado
  rolcomparar
  opcionSeleccionado
  permisorol
  acordeon=false
  userapi
  contApi
  usuarioapiedit
  estadoapiedit
  idapiedit
  passwordapiedit
  buscarusuarioapi
  categoriapi
  permisoapi
  validarusuarioapi=false
  validardatos=false
  idusuarioapi
  usuarioapi
  passwordapi
  estado
  
  
  constructor(private permisos:PermisosService) {  }


  ngOnInit(){

    this.permisos.getCategorias().subscribe(data=>{
      this.categoria=data
    })

   

   this.getRolAdmin();
   this.getUserApi();

  }

  pasarol(rol){
    this.roleditado=rol
  }

  editarol(idrol){
    this.rolcomparar=idrol
    this.check=true
  }

  editarolF(id,rol){


    if(this.roleditado===undefined){
      this.roleditado=rol
    }

    if(this.roleditado===""){
      return Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Por favor llena el campo vacio',
     })
   }

    console.log(this.roleditado,id)
    this.permisos.editarolDB(id,this.roleditado).subscribe(data=>{

    this.roleditado=undefined
    this.check=false

    })
    
  }

  cancelarol(){

    this.check=false
  }


  getRolAdmin(){

    this.permisos.getRolAdmin().subscribe(data=>{
      this.rol=data,
      this.cont=this.rol.length
      
})

  }

  getUserApi(){

    this.permisos.getUserApi().subscribe(data=>{
      this.userapi=data,
      this.contApi=this.userapi.length
    })

  }

  buscarusuario(){

    if(this.cedula===undefined || this.cedula===""){
      return Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Por favor llena el campo vacio',
     })
   }
    
    this.permisos.getUser(this.cedula).subscribe((data:any)=>{
      this.usuario=data
    })

    this.permisos.getUserid(this.cedula).subscribe(data2=>{

      if(data2===0){
        return;
      }

      this.idusuario=data2[0].id
      console.log(this.idusuario)
    })

    
    
  }

  consultarusuario(){

    this.permisos.getPermisos(this.idusuario).subscribe(data=>{
      this.permiso=data
    })

    this.permisos.getRoles(this.idusuario).subscribe(data=>{
      this.roles=data
    })

  }

  asignar(idpermiso,checked){

    console.log(idpermiso,this.idusuario,checked)

    if(checked === true){

      this.permisos.asignartPermisos(this.idusuario,idpermiso,'save').subscribe(console.log)

    }else{

      this.permisos.asignartPermisos(this.idusuario,idpermiso,'delete').subscribe(console.log)

    }

  }

  asignarApi(idpermiso,checked){

    console.log(idpermiso,this.idusuarioapi,checked)

    if(checked === true){

      this.permisos.asignarPermisosApi(this.idusuarioapi,idpermiso,'save').subscribe(console.log)

    }else{

      this.permisos.asignarPermisosApi(this.idusuarioapi,idpermiso,'delete').subscribe(console.log)

    }

  }

  asignarol(idrol){

   this.permisos.asignartRoles(this.idusuario,idrol).subscribe(data=>{
     console.log(data)
   })

  }

  asignarolpermiso(idpermiso,checked){
    console.log(idpermiso,checked,this.opcionSeleccionado)

    if(checked === true){

      this.permisos.asignarRolPermisos(this.opcionSeleccionado,idpermiso,'save').subscribe(console.log)

    }else{

      this.permisos.asignarRolPermisos(this.opcionSeleccionado,idpermiso,'delete').subscribe(console.log)

    }

  }

  crearusuarioapi(usuario,password,estado){

 
    this.permisos.crearRolApi(usuario,password,estado).subscribe(data=>{
      this.getUserApi();
    })


  }

 buscarusuarioapiFuncion(){

  if(this.buscarusuarioapi===undefined || this.buscarusuarioapi===""){
     this.validardatos=false;
     return;
 }

  this.validardatos=true;

   this.getCategoriasApi()

    this.permisos.buscarusuarioapi(this.buscarusuarioapi).subscribe(data=>{

      if(data[0]==undefined){
        this.validarusuarioapi=false
        return;
      }

      this.validarusuarioapi=true;
      this.idusuarioapi=data[0].id

      this.permisos.getPermisosApi(data[0].id).subscribe(data=>{
        this.permisoapi=data
      })

    })

    

  }

  getCategoriasApi(){

    this.permisos.getCategoriasapi().subscribe(data=>{
      this.categoriapi=data
    })

  }

  editarusuarioapi(id,usuario,estado){

    this.usuarioapiedit=usuario
    this.idapiedit=id
    this.estadoapiedit=estado

  }

  editarusuarioapiF(){

    this.permisos.editarusuarioapi(this.idapiedit,this.usuarioapiedit,this.passwordapiedit,this.estadoapiedit).subscribe(data=>{
      this.getUserApi();
    })

  }

  eliminarusuarioapi(id){

    this.permisos.eliminarusuarioapi(id).subscribe(data=>{
      this.getUserApi();
    })

  }

  crearol(){

    if(this.rolcreado===undefined || this.rolcreado===""){
      return Swal.fire({
       icon: 'error',
       title: 'Oops...',
       text: 'Por favor llena el campo vacio',
     })
     }
      
      this.permisos.crearRolAdmin(this.rolcreado).subscribe(data=>{
        this.getRolAdmin(),
        this.rolcreado="",
        Swal.fire({
          icon:'success',
          title: 'Guardada con exito',
          showConfirmButton: false,
          timer: 1500
      })
      })
  }

  eliminarol(idrol){

    Swal.fire({ 
      title: 'Estas seguro ?', 
      text: "Esta opcion no tiene reversa!", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText:'Cancelar', 
    }).then((result) => { 
      if (result.isConfirmed) { 
       
        this.permisos.eliminarol(idrol).subscribe(data=>{
          this.getRolAdmin(),
          this.rolcreado="",
          Swal.fire({
            icon:'success',
            title: 'Eliminada con exito',
            showConfirmButton: false,
            timer: 1500
            }).then(() => console.log('elimindo'))
        })
        
      } 
    })

  }

  capturar(){

    this.acordeon=false
    
    this.permisos.obtenerpermisosrol(this.opcionSeleccionado).subscribe(data=>{
      this.permisorol=data,
      this.acordeon=true
    })

  }

}
