import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn:'root'
})
export class PermisosService {

     constructor(private http:HttpClient){}

     getUser(cedula){

        let params = {
            cedula:cedula
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/buscar`,params)
        
     }

     getUserid(cedula){

        let obj = {
            cedula:cedula
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/buscarid`,obj)
        
     }

     getCategorias(){

        return this.http.get(`${environment.endpoint}/api/perfiles/permisocategoria`)

     }

     getCategoriasapi(){
      
      return this.http.get(`${environment.endpoint}/api/perfiles/permisocategoriapi`)

     }


     getPermisos(idusuario){

        let params = {
            idusuario:idusuario
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/permiso`,params)

     }

     getPermisosApi(idusuario){

      let params = {
          idusuario:idusuario
      }
    
      return this.http.post(`${environment.endpoint}/api/perfiles/permisoapi`,params)

   }


     asignartPermisos(idusuario,idpermiso,accion){

        let params = {
            idusuario:idusuario,
            idpermiso:idpermiso,
            accion:accion
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/permisoasignar`,params)

     }

     asignarPermisosApi(idusuario,idpermiso,accion){

      let params = {
         idusuario:idusuario,
         idpermiso:idpermiso,
         accion:accion
     }

     return this.http.post(`${environment.endpoint}/api/perfiles/permisoasignarapi`,params)

     }

     getRoles(idusuario){

        let params = {
            idusuario:idusuario
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/roles`,params)

     }

     asignartRoles(idusuario,idrol){

        let params = {
            idusuario:idusuario,
            idrol:idrol
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/rolesasignar`,params)

     }

     asignarRolPermisos(idrol,idpermiso,accion){

      let params = {
         idrol:idrol,
         idpermiso:idpermiso,
         accion:accion
     }

     return this.http.post(`${environment.endpoint}/api/perfiles/permisoasignarol`,params)

     }

     getRolAdmin(){

        return this.http.get(`${environment.endpoint}/api/perfiles/obtenerol`)

     }

     getUserApi(){

      return this.http.get(`${environment.endpoint}/api/perfiles/obteneruserapi`)

   }

   crearRolApi(usuario,password,estado){

      let params = {
         usuario:usuario,
         password:password,
         estado:estado
     }

     return this.http.post(`${environment.endpoint}/api/perfiles/crearusuarioapi`,params)

   }

   buscarusuarioapi(usuario){

      let params = {
         usuario:usuario
     }

     return this.http.post(`${environment.endpoint}/api/perfiles/buscarusuarioapi`,params)

   }

   editarusuarioapi(id,usuario,password,estado){

      let params = {
         id:id,
         usuario:usuario,
         password:password,
         estado:estado
     }

     return this.http.post(`${environment.endpoint}/api/perfiles/editarusuarioapi`,params)

   }

   eliminarusuarioapi(id){

      let params = {
         id:id
     }

     return this.http.post(`${environment.endpoint}/api/perfiles/eliminarusuarioapi`,params)

   }

     crearRolAdmin(Rol){

        let params = {
            rol:Rol
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/crearol`,params)

     }

     eliminarol(id){

        let params = {
            id:id
        }

        return this.http.post(`${environment.endpoint}/api/perfiles/eliminarol`,params)

     }

     editarolDB(id,rol){

      let params = {
         id:id,
         rol:rol
      }

      return this.http.post(`${environment.endpoint}/api/perfiles/editarol`,params)

     }

     obtenerpermisosrol(idrol){

      let params = {
         idrol:idrol
      }

      return this.http.post(`${environment.endpoint}/api/perfiles/obtenerolpermiso`,params)

     }


}