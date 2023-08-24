import { Component, OnInit } from '@angular/core';
import { concatMap, switchMap, take, tap, throttle } from 'rxjs/operators';
import { PapeleriaReciclajeService } from 'src/app/api/papeleria-reciclaje.service';
import {ToastrService} from 'ngx-toastr'
import Swal from 'sweetalert2'
import {StateService} from '../../services/state.service'
import { TranslateService } from '@ngx-translate/core';
import { interval, of } from 'rxjs';
import { ArticlesApiService, postArticleDTO } from '../../api/articles-api.service';
import { ArticleEditableComponent } from '../article-editable/article-editable.component';
import { ArticlesWebSocketsService } from '../../webSockets/articles-web-sockets.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-papeleria-reciclaje',
  templateUrl: './papeleria-reciclaje.component.html',
  styleUrls: ['./papeleria-reciclaje.component.css']
})
export class PapeleriaReciclajeComponent implements OnInit {
  search:string = ""
  papeleras:Array<any> =[]
  p = 1
  verificar:boolean=false;
  validar:Boolean = false
  constructor(
    private papeleriaService:PapeleriaReciclajeService, 
    private toastr : ToastrService,
    private state :StateService,
    private translate:TranslateService,
    private articlesApi:ArticlesApiService,
    private articlesWebSockets: ArticlesWebSocketsService,
    public socketService:SocketService,

    ) { }

  ngOnInit() {
    this.getAllArticlePapeleria()
  }

  getAllArticlePapeleria(){
    this.papeleriaService.getAllArticlePapeleria().pipe(
      take(1),
      tap( (res:any) => {
         this.papeleras = res
         this.verificar=true
         
      })
    ).subscribe()
  }


  eliminarArticulo(id){
    Swal.fire({ 
      title: this.translate.instant('Estas Seguro?'),
      text:  this.translate.instant('Tu quieres borrar el articulo'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('Si')
    }).then(result => {
        if(result.isConfirmed){
          this.papeleriaService.deleteArticuloPapeleria(id).pipe(
            take(1),
            tap(()=>{
              this.getAllArticlePapeleria()
            })
          ).subscribe()
          
            Swal.fire(this.translate.instant('El articulo se ha eliminado'), '', 'success')   
        }
    })
    return true
  }


  restaurarArticle(articles){
    Swal.fire({
      title: this.translate.instant('Estas Seguro?'),
      text:  this.translate.instant('Tu quieres Restaurar el articulo'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('Si')
    }).then(result=>{
      if(result.isConfirmed){
        let newArticle:postArticleDTO  = {
          attached:[],
          category:articles.categoria_id,
          content: articles.content,//! arreglar el contenido 🖐🤣
          obj:articles.obj,
          role:"articulo",
          state:'1',
          tags:null,
          title:articles.title
        }; 
    
        of(null).pipe(
          throttle(() => interval(700)),
          concatMap(() => this.articlesApi.postArticle(newArticle, false, this.validar )),
          tap(newArticle => {
             
            let partialArticle = {
              creator:newArticle.creator,
              title:newArticle.title,
              id:newArticle.id,
              subLine: newArticle.subLine,
              line: newArticle.line,
              category : newArticle.category
            }
    
            const article = {
              id:newArticle.id,
              title:articles.title,
              creator:this.state.getValueOf('user').sub,
              type:'Creacion',
              category : articles.categoria_id,
              date:Date.now()
            }
    
            this.articlesWebSockets.sendNotification('newarticle', partialArticle)
                  
            this.socketService.getNotificacionesActive().subscribe(
            (  res:any) => {
      
                 this.socketService.getNotificacionesCreate(article).subscribe(console.log) 
      
              }
            )
            this.papeleriaService.deleteArticuloPapeleria(articles.id).subscribe(
               res => {
                  this.getAllArticlePapeleria()
                  Swal.fire(this.translate.instant('El articulo se restaurado exitosamente'), '', 'success') 
               }
            )
    
          })).subscribe()
    
         
      }
    })
  }

}
