import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { StateService } from "../services/state.service";

@Injectable({
    providedIn:'root'
})
export class LdapService {
    
     
     constructor(
        private http:HttpClient,
        public state:StateService
        ){
          
        }

    insertarLdap(documento,password,nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,tipo){
        const datos={documento,password,nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,tipo}
        return this.http.post('/api/ldap/insertar', datos)
    }

    editarLdap(nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,id,tipo,actividad){
        const datos={nombre,correo_personal,genero_capturado,fecha_nacimiento,direccion,correo_corporativo,celular,telefono,id,tipo,actividad}
        return this.http.post('/api/ldap/editar', datos)
    }

    buscarLdap(usuario){
        const datos={usuario}
        return this.http.post('/api/ldap/buscar', datos)
    }

    validaruserLdap(usuario){
        const datos={usuario}
        return this.http.post('/api/ldap/validaruser', datos)
    }

    desbloquear(id,desbloquearnew){
        const datos={id,desbloquearnew}
        return this.http.post('/api/ldap/desbloquear', datos)
    }

    mostrarLdap(){
        return this.http.get('/api/ldap/mostrar')
    }

    generoLdap(){
        return this.http.get('/api/ldap/genero')
    }

    tipoLdap(){
        return this.http.get('/api/ldap/tipo')
    }

    elimarLdap(id,documento){
        const datos={id,documento}
        return this.http.post('/api/ldap/eliminar',datos)
    }

    ingresoLdap(id){
        const datos={id}
        return this.http.post('/api/ldap/ingreso',datos)
    }

    primeringresoLdap(id){
        const datos={id}
        return this.http.post('/api/ldap/primeringreso',datos)
    }

    cambiarpasswordLdap(id,passwordnuevo){
        const datos={id,passwordnuevo}
        return this.http.post('/api/ldap/cambiarpassword',datos)
    }

    resetpasswordLdap(email,passwordnuevo,token){
        const datos={email,passwordnuevo,token}
        return this.http.post('/api/reset/pass',datos)
    }

    reset(email){
        const datos={email}
        return this.http.post('/api/reset/password',datos)
    }

    validartoken(token){

        const datos={token}
        return this.http.post('/api/reset/validar',datos)

    }

}