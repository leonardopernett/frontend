import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RepositorioApiService {

  private endPoints = {
      createRepositorio: ( articleId:string) => `${environment.endpoint}/api/repositorio/${articleId}`,
      getRepositorio:( articleId:string) =>`${environment.endpoint}/api/repositorio/${articleId}`,
      updateRepositorio : (id:number) =>`${environment.endpoint}/api/repositorio/${id}`,
  }

  constructor(private http: HttpClient) { }

  saveRepositorio(id, documento){
    console.log(documento)
   return  this.http.post(this.endPoints.createRepositorio(id),documento)
  }

  getRepositorioId(id){
    return  this.http.get(this.endPoints.createRepositorio(id))

  }

  deleteRepositorioBorrador(id, username){
   const params = {
     username
   }
    return  this.http.put(`${environment.endpoint}/api/repositorio/${id}`,params)

  }

  creartablapermisos(data){

     return this.http.post(`${environment.endpoint}/api/reportable/upload`,data)
  }

  obtenertablapermisos(){

    return this.http.get(`${environment.endpoint}/api/reportable/download`)
 }

 getMultipleUsers(pcrc){
  const params = {
    pcrc
  }
    return this.http.post(`${environment.endpoint}/api/articles/multipleuser`, params)
 }

  guardarPermisosAutomatizados(origen,destino){
  const params = {
    origen,
    destino
  }
    return this.http.post(`${environment.endpoint}/api/articles/guardarpcrcautomatizados`, params)
 }

 eliminarPermisosAutomatizados(id){
  const params = {
    id
  }
    return this.http.post(`${environment.endpoint}/api/articles/eliminarpcrcautomatizados`, params)
 }

}