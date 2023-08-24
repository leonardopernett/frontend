import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, HostListener,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgScrollbar } from 'ngx-scrollbar';
import { map, switchMap, tap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { RTEViewComponent } from "../rteview/rteview.component";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { StateService } from "../../services/state.service";
import { CommentsApiService } from 'src/app/api/comments-api.service';
import  Swal from 'sweetalert2'
import { SocketService } from '../../services/socket.service';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';

@Component({
  selector: 'app-articlebanco-view',
  templateUrl: './articlebanco-view.component.html',
  styleUrls: ['./articlebanco-view.component.css']
})
export class ArticleViewBancoComponent implements OnInit, AfterViewInit {
  
  @ViewChild(RTEViewComponent, { static: false })
  rteview: RTEViewComponent;

  @ViewChild('content', { static: false })
  newsContainer: ElementRef;

  @ViewChild(NgScrollbar, { static: true })
  scrollbarRef: NgScrollbar;

  @Input()
  articleId: string;


  public comments = []
  mostrarbanco: boolean;
  mostrar: boolean;
  articleobj;
  links=[]

  constructor(
    public activatedRoute: ActivatedRoute,
    public renderer: Renderer2,
    public articlesApi: ArticlesApiService,
    public Location: Location,
    public router: Router,
    public googleAnalytics: googleAnalytics,
    public stateService: StateService,
    public commentsApi:CommentsApiService,
    public socketService:SocketService,
    public state:StateService,
    private translate:TranslateService,
    private socket:SocketService
  ) { }

  // private articleUrl:string;
  public article: Article;
  public modificationDate: string;
  public publicationDate: string;
  public isFavoriteHover = false;
  public startTime: Date;
  public finalTime: Date;
  
  public container: Element;
  public indexElements: Element[];
  public currentScoll: number = 0;

  public modo:'indice'|'tags'|'adjuntos' = 'indice';
  public articulo = null
  public adjuntosVisibles = false

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.sendViewInfo() 
  }

  ngOnInit() {
    this.commentsApi.getComments(this.articleId, { from: 0, size: 10 }).pipe(
      tap( (comments:any) => {
        this.comments = comments
        console.log(this.comments)
      
      })
    ).subscribe()

    this.activatedRoute.params.pipe(
      map(params => params.id),
      switchMap(articleId => {
        return this.articlesApi.getArticle(articleId)
      })
    ).subscribe((article: Article) => {
      
      this.article = article;
      this.articleobj=article.obj;


      this.startTime = new Date();

      const res=axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles/`+article.id_otros+`/attachments`);
      res.then((data:any)=>{
        this.links=data.data.article_attachments
      })
    
   
    })

  }

  ngAfterViewInit() {

 

   
  
  }

  favoriteIcon() {
    // if (this.isFavorite()) {
    //   return 'mdi:heart-multiple'
    // } else {
    //   return 'mdi:cards-heart'
    // }
  }

  goBack() {
    this.Location.back();
  }

  scrollTo(el: Element) {
    // container.scrollTop = nodeList[2]['offsetTop']
    // this.container.scrollTop = el['offsetTop'];
    this.scrollbarRef.scrollTo({ top: el['offsetTop'] })
  }

  calculateActive(index) {
    if (this.indexElements[index + 1]) {
      if (this.indexElements[index]['offsetTop'] - 100 < this.currentScoll && this.indexElements[index + 1]['offsetTop'] - 100 > this.currentScoll) {
        return 'active';
      } else {
        return 'na'
      }
    } else {
      return 'na';
    }
  }

  searchTag(tag) {
    this.router.navigate(['/app/search'], { queryParams: { tag: tag } })
  }

  goToArticleEdition() {
    if(this.article.type == 'noticia'){
      this.router.navigate(['/app/newseditor', this.article.id ])

    } else {
      this.router.navigate(['/app/articlecreation'], { queryParams: { articleId: this.article.id } })

    }
  }

  sendViewInfo() {
   
    if (!this.finalTime) {
      this.finalTime = new Date()
       this.googleAnalytics.sendEvent(
        'lecture',
        'interaction',
        this.stateService.getValueOf('selectedCliente').cliente + '/' + this.stateService.getValueOf('selectedPcrc').pcrc,
        this.finalTime.getTime() - this.startTime.getTime()
      ) 
       this.articlesApi.postArticleView(this.article.id, this.startTime.getTime(), this.finalTime.getTime())
        .subscribe() 
       
    }
  
  }

  articleDelete(){
    this.activatedRoute.params.pipe(
       map(param =>param.id),
       switchMap(id=>{
         return this.articlesApi.getArticle(id)
       })
    ).subscribe(
      data => {
         this.articulo = data
      }
    )

    Swal.fire({

      title: this.translate.instant('Estas Seguro?'),
      text:  this.translate.instant('Tu quieres borrar el articulo'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translate.instant('Si')

    }).then((result) => {
      if (result.isConfirmed) {
        this.articlesApi.deleteArticle(this.article.id).pipe(
          tap(() => {
            this.router.navigate(['/app/explore'])
            Swal.fire(
              this.translate.instant('Eliminado'),
              this.translate.instant('El articulo se ha eliminado'),
              'success'
            ),
            this.socket.getNotificacionesDelete(this.article.id).subscribe(()=>console.log('notificaciones eliminada'))
          })
         ).subscribe()
       /*  const {id , title } = this.articulo
        const newArticulo = {
          id,
          title,
          type:'Elimados',
          creator: this.state.getValueOf('user').sub,
          category:this.articulo.categoria_id,
          date: Date.now()
        }

         this.socketService.emit('articuloeliminado', newArticulo) */
      }
    })
  }

  addToFavorites() {
    this.articlesApi.postFavorite(this.article.id).pipe(
      tap(result => {
        this.article.favoritos = result.favoritos
      })
    ).subscribe()
  }

  addLike() {
    this.articlesApi.postLike(this.article.id).pipe(
      tap(result => {
        console.log(result)
        this.article.likes = result.likes
        this.article.dislikes = result.dislikes
      })
    ).subscribe()
  }

  addDislike(){
    this.articlesApi.postDisLike(this.article.id).pipe(
      tap(result => {
        this.article.likes = result.likes
        this.article.dislikes = result.dislikes
      })
    ).subscribe()
  }

}
