import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class RegisterUserExternoService {

    constructor(private http: HttpClient) {  }
   
    registrarusuario(data){
        return this.http.post(`${environment.endpoint}/api/externo/createuser`,data,{headers:{ 
            'Authorization':JSON.parse(localStorage.getItem('token'))
        }});
    }

}