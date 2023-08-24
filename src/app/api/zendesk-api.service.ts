import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ZendeskApiService {

    constructor(private http: HttpClient) { }

    getArticles() {
        return this.http.get(`${environment.endpoint}/api/zendesk/articulos`);
    }

    changesArticles(articulo){
        return this.http.put(`${environment.endpoint}/api/zendesk/changearticulo`,{articulo})
    }
  
}