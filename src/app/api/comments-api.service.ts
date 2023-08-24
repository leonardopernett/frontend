import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type postCommentDTO = {
  replyTo?:string;
  text:string;
}

export type comment = {
  articulo_id:string;
  publication_date:number;
  user:string;
  username:string;
  replyTo:string;
  text:string;
  id:string;
  replies?:comment[]
}

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  private endPoints = {
      postComment: ( articleId:string) => `${environment.endpoint}/api/articles/${articleId}/comments`,
      getComments: ( articleId:string) => `${environment.endpoint}/api/articles/${articleId}/comments`,
      getReplies: ( commentId:string) => `${environment.endpoint}/api/comments/${commentId}/replies`,
      deleteReplies: ( commentId) => `${environment.endpoint}/api/comments/${commentId}/repliesdelete`,
      deleteComment: ( commentId) => `${environment.endpoint}/api/comments/${commentId}/deletecomment`,
      deleteComments: (id) => `${environment.endpoint}/api/comments/${id}/deletecomments`
  };

  constructor(private http: HttpClient) { }

  postComment(comment: postCommentDTO, articleId:string): Observable<comment>{
    return this.http.post<comment>(this.endPoints.postComment(articleId), comment, { observe: "body" })
  }

  deleteReplies(id){
    return this.http.delete(this.endPoints.deleteReplies(id))
  }

  deleteComment(id, cedula){

      const data= {id,cedula}

      return this.http.post('/api/comments/deletecomment', data)
  
  }

  deleteComments(id){
    return this.http.delete(this.endPoints.deleteComments(id))
  }

  getComments( articleId:string, params?: { from:number, size:number }): Observable<comment[]>{
    if( params ){
      return this.http.get<comment[]>(this.endPoints.getComments(articleId), { params: { from: params.from.toString(), size: params.size.toString() }, observe: "body" })
    }else{
      return this.http.get<comment[]>(this.endPoints.getComments(articleId), { observe: "body" })
    }
  }

  getRepliesTo(commentid:string, params?: { from:number, size:number }): Observable<comment[]>{
    if( params ){
      return this.http.get<comment[]>(this.endPoints.getReplies(commentid), { params: { from: params.from.toString(), size: params.size.toString() }, observe: "body" })
    }else{
      return this.http.get<comment[]>(this.endPoints.getReplies(commentid), { observe: "body" })
    }
  }

}