import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { news, NewsApiService } from "../../api/news-api.service";
import { StateService } from "../../services/state.service";
import { RichTextEditorComponent } from "../rich-text-editor/rich-text-editor.component";
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css']
})
export class NewsEditorComponent implements OnInit, AfterViewInit {

  newsOnEdition: news;

  @ViewChild(RichTextEditorComponent,{ static:false })
  RTE:RichTextEditorComponent;

  @ViewChild('articleTitle', { static: false })
  articleTitle: ElementRef
  
  postNewsSpinner = false;

  saveDraftNewsSpinner = false;

  sinContenidoModalOpen = false;

  Actualizar:string
  Publicar:string

  constructor(
    private activatedRoute: ActivatedRoute,   
    private newsApi: NewsApiService,
    public state: StateService,
    private router: Router,
    private articlesWebSockets: ArticlesWebSocketsService,
    private translate:TranslateService
  ) { 
    this.Actualizar = this.translate.instant('Actualizar')
    this.Publicar =this.translate.instant('Publicar')
   }

  ngOnInit() {  }
  
  ngAfterViewInit() {
    this.activatedRoute.params.pipe(
      map(params => params.id),
      filter(newsId => newsId == 'new'),
      tap(newsId => {
        if(newsId == 'new'){
          this.clear()
        }
      })
    ).subscribe()

    this.activatedRoute.params.pipe(
      map(params => params.id),
      filter(newsId => newsId != 'new'),
      switchMap( newsId => this.newsApi.getSingleNews(newsId)),
      tap(news => {

        if(!!!this.state.getValueOf('idNewsOnEdition').length){
          this.state.onIdNewsOnEdition(news.id)
        }

        this.RTE.setContent(JSON.parse(news.obj))
        this.articleTitle.nativeElement.value = news.title
        this.newsOnEdition = news;
      })
    ).subscribe()
  }

  clear(){
    this.RTE.setContent({});
    this.articleTitle.nativeElement.value = '';
    this.newsOnEdition = undefined;
  }

  publishNews = () => {

    this.postNewsSpinner = true;

    if (this.RTE.getContent().length > 24 && this.articleTitle.nativeElement.value.length > 0) {

      if(!!!this.newsOnEdition){
  
        let newsToSave = {
          attached: [],
          content: this.RTE.getText(),
          obj: this.RTE.getContent(),
          state: '2',
          pcrc: this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
          title: this.articleTitle.nativeElement.value
        }
  
        this.newsApi.postNews(newsToSave).pipe(
          tap(newsAdded => {

            let notificationData:Partial<news> = {
              id:newsAdded.id,
              title:newsAdded.title,
              subline:newsAdded.subline,
              creator:newsAdded.creator
            }

            this.articlesWebSockets.sendNotification('nuevanoticia', notificationData)

            this.newsOnEdition = newsAdded;
            this.postNewsSpinner = false;
            this.router.navigate(['/app/articles', newsAdded.id])
          })
        ).subscribe()
  
      } else {
        let newsToUpdate = {
          content: this.RTE.getText(),
          obj: this.RTE.getContent(),
          state: '2',
          title: this.articleTitle.nativeElement.value
        }
  
        this.newsApi.updateNews(this.newsOnEdition.id, newsToUpdate).pipe(
          tap(newsAdded => {          
            this.postNewsSpinner = false;
            // !this.listMode = 'news'
            this.router.navigate(['/app/articles', this.newsOnEdition.id])
          })
        ).subscribe()
  
      }
    } else {      
      this.postNewsSpinner = false;
      this.sinContenidoModalOpen = true;
    }
  }
  
  saveAsDraft = () => {
    let newsToSave = {
      attached: [],
      content: this.RTE.getText(),
      obj: this.RTE.getContent(),
      state: '2',
      pcrc: this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
      title: this.articleTitle.nativeElement.value
    }

    this.saveDraftNewsSpinner = true;

    if (this.RTE.getContent().length > 24 && this.articleTitle.nativeElement.value.length > 0) {
      if (!!!this.newsOnEdition) {

        this.newsApi.postNews(newsToSave).pipe(
          tap(newsAdded => {
            this.newsOnEdition = newsAdded
            this.saveDraftNewsSpinner = false
            this.state.onNewDraft(newsAdded)
          })
        ).subscribe()

      } else {
        this.newsApi.updateNews(this.newsOnEdition.id, newsToSave).pipe(
          tap(result => {
            this.saveDraftNewsSpinner = false;
          })
        ).subscribe()
      }
    } else {
      this.saveDraftNewsSpinner = false;
      this.sinContenidoModalOpen = true;
    }

  }

}