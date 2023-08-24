import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface news {
  id: string;
  title: string;
  content: string;
  obj: string;
  attached: string[];
  publicationDate: string;
  modificationDate: string;
  modificationUser: string;
  creator: string;
  commentsList: string;
  state: string;
  subline: string;
}

export interface newsDTO {
  title: string;
  content: string;
  obj: string;
  attached: string[];
  state: string;
  pcrc: string;
}

export interface UpdateNewsDTO {
  title: string;
  content: string;
  obj: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http: HttpClient) { }

  private endPoints = {
    getNews: (idPcrc: string) => `${environment.endpoint}/api/pcrc/${idPcrc}/news`,
    getSingleNews: (idNews: string) => `${environment.endpoint}/api/news/${idNews}`,
    postNews: `${environment.endpoint}/api/news`,
    updateNews: (idNews: string) => `${environment.endpoint}/api/news/${idNews}`,
    deleteNews: (idNews: string) => `${environment.endpoint}/api/news/${idNews}`
  }

  public getNews({
    idSubline,
    state,
    from = 0,
    size = 20,
    date = new Date().getTime().toString(),
    query
  }: {
    idSubline: string,
    state: 'published' | 'archived',
    from?: number,
    size?: number,
    date?:string,
    query?:string
  } ): Observable<news[]> {

    if(query){
      
      return this.http.get<news[]>(this.endPoints.getNews(idSubline), { params: { state: state, from: from.toString(), size: size.toString(), date: date, query:query }, observe: "body" })

    } else {

      let fecha=new Date(parseInt(date))
      let fechafinal=`${fecha.getUTCFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
 
      return this.http.get<news[]>(this.endPoints.getNews(idSubline), { params: { state: state, from: from.toString(), size: size.toString(), date: fechafinal }, observe: "body" })

    }
  }

  public postNews(news: newsDTO): Observable<news> {
    return this.http.post<news>(this.endPoints.postNews, news, { observe: "body" })
  }

  public getSingleNews(idNews: string): Observable<news> {
    return this.http.get<news>(this.endPoints.getSingleNews(idNews), { observe: "body" })
  }

  public updateNews(idNews: string, news: UpdateNewsDTO): Observable<{ status: string }> {
    return this.http.put<{ status: string }>(this.endPoints.updateNews(idNews), news, { observe: "body" })
  }

  public deleteNews(idNews: string): Observable<{ status: string }> {
    return this.http.delete<{ status: string }>(this.endPoints.deleteNews(idNews), { observe: "body" })
  }
}