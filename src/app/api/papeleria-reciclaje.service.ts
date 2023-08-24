import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn:'root'
})
export class PapeleriaReciclajeService {

     constructor(private http:HttpClient){}



     getAllArticlePapeleria(){
        return this.http.get(`${environment.endpoint}/api/papeleria`)
        
     }

     deleteArticuloPapeleria(id:number){
         console.log(id)
         return this.http.delete(`${environment.endpoint}/api/papeleria/delete/${id}`)
     }

     restaurarArticuloPapeleria(article){
         return this.http.post(`${environment.endpoint}/api/papeleria`, article)
     }
}