import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Socket } from 'ngx-socket-io'
import {environment} from '../../environments/environment'

@Injectable({providedIn:'root'})
export class SocketService {

 public verifyConnect:boolean = false 

 constructor(private http:HttpClient){
 /*  this.checkConnection() */

 }

 /* checkConnection(){
   this.socket.on('connect',()=>{
         console.log('connect startup') 
         this.verifyConnect= true 
   })

   this.socket.on('disconnect',()=>{
     console.log('connect disconnect')
     this.verifyConnect = false
  })
 }

 emit(event:string, paylaod:any ){
   this.socket.emit(event, paylaod)
 }

 listen(event){
   return this.socket.fromEvent(event)
 } */


 getNotificaciones(documento){
   const param = { documento }
   return this.http.post(`${environment.endpoint}/api/notificaciones`,param)
 }

 getNotificacionesLeidas(param){
   return this.http.post(`${environment.endpoint}/api/notificaciones/leidas`,param)
 }

 getNotificacionesByDocument(param){
   return this.http.get(`${environment.endpoint}/api/notificaciones/${param}`)
 }


 getNotificacionesCreate(param){
   return this.http.post(`${environment.endpoint}/api/notificaciones/create-article`, param)
 }

 getNotificacionesUpdate(param){
  return this.http.post(`${environment.endpoint}/api/notificaciones/update-article`, param)
}

getNotificacionesComment(param){
  return this.http.post(`${environment.endpoint}/api/notificaciones/comment-response`, param)
}


getNotificacionesActive(){
   return  this.http.get(`${environment.endpoint}/api/notificaciones/active`)
}

getNotificacionesDelete(articulo_id){
  console.log(articulo_id)
  return this.http.delete(`${environment.endpoint}/api/notificaciones/delete/${articulo_id}`)
}

}