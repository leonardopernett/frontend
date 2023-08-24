import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { environment } from '../../environments/environment';

export type postArticleDTO = {
    title: string;
    content: string;
    obj:string;
    tags: string[];
    resume?: string;
    attached: string[];
    role: string;
    category: string;
    state: 'published'|'archived';
}

@Injectable({
    providedIn: 'root'
})
export class FilesApiService {

    constructor(private http: HttpClient) { }

    private endPoints = {
        deleteFile:(idArticle, fileName) => `${environment.endpoint}/files/${idArticle}/${fileName}`,
    }

    deletFile(idArticle:string, fileName:string): Observable<Article[]> {
        return this.http.delete<Article[]>(this.endPoints.deleteFile(idArticle, fileName), { observe: "body" })
    }

}

