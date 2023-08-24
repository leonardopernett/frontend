import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommentsApiService, comment } from "../../api/comments-api.service";
import formatDistance from 'date-fns/formatDistance'
import { es } from 'date-fns/locale'
import { tap } from 'rxjs/operators';
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { StateService } from "../../services/state.service";
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { CommentListComponent } from '../comment-list/comment-list.component';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;
  @Input() comments

  @ViewChild('input', { static:false })
  input: ElementRef;

  replyMode = false;
  emojiMode = false;
  articuloId= null
  constructor(
    private commentsApi:CommentsApiService,
    private articlesWebSockets:ArticlesWebSocketsService,
    private comentariolist:CommentListComponent,
    private activeRouter:ActivatedRoute,
    private socketService:SocketService,
    private state:StateService,
    private translate:TranslateService
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe(res=>this.articuloId = res.id)
    
  }



  addEmoji(event){
    console.log(event)
  }
  
  gethumanTime = (time) => {
    return formatDistance( new Date(time) ,new Date(),{ addSuffix: true , includeSeconds:true, locale:es })
  }

  sendComment(){
    this.commentsApi.postComment({ text :this.input.nativeElement.value, replyTo:this.comment.id }, this.comment.articulo_id).pipe(
      tap(newComment => {

        let commentNotification:Partial<comment & { replytext:string }> = {
          articulo_id:newComment.articulo_id,          
          id:newComment.id,
          text:newComment.text,
          user:newComment.user,
          username:newComment.username,
          replyTo:newComment.replyTo,
          replytext:this.comment.text
        }

        this.articlesWebSockets.sendNotification('newComment', commentNotification)
        this.comment.replies = [ ...[newComment] ]
        this.input.nativeElement.value = ''
        this.replyMode = false

      })
    ).subscribe()
    const params = {
      id:this.articuloId,
      title:this.input.nativeElement.value,
      creator:this.state.getValueOf('user').sub,
      type:'Respuesta comentario',
      date:Date.now()
    } 
    
     this.socketService.getNotificacionesActive().subscribe(
       () =>  
        {
        
            this.socketService.getNotificacionesComment(params).subscribe(console.log) 
           
        }
     )
       
  }

  iconoSeleccionado(event){
    if((this.input.nativeElement.value + event.emoji.native).length < 150 ){
      this.input.nativeElement.value = this.input.nativeElement.value.slice(0,this.input.nativeElement.selectionStart) + event.emoji.native + this.input.nativeElement.value.slice(this.input.nativeElement.selectionStart)
    }
  }

  borrareply(id){

    Swal.fire({
      title: this.translate.instant('Estas Seguro?'),
      text: this.translate.instant('Quieres Borrar el comentario?'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentsApi.deleteReplies(id).subscribe(
          ()=>{
           
            this.comentariolist.obtenercomentarios()
           
          })
       
      }
    })
}
  
  
  borrarcomentario(id){

      Swal.fire({
        title: this.translate.instant('Estas Seguro?'),
        text: this.translate.instant('Quieres Borrar el comentario?'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
            this.commentsApi.deleteComment(id, this.state.getValueOf('user').sub).subscribe(
            ()=>{
              this.comentariolist.obtenercomentarios()
            })
         
        }
      })
  }

}
