import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PerfilApiService {

    constructor(private http: HttpClient) { }

    guardaravatar(id_avatar,id_user){

        let params = {
            id_avatar,
            id_user
        }
      
        return this.http.post(`${environment.endpoint}/api/avatar/guardaravatar`,params);

    }

    mostraravatar(id_user){

        let params = {
            id_user
        }
      
        return this.http.post(`${environment.endpoint}/api/avatar/mostraravatar`,params);

    }

    avatarTodos(){

       return this.http.get(`${environment.endpoint}/api/avatar/avatartodos`); 

    }

    }