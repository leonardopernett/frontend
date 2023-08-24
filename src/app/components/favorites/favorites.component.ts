import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from "../../article";
import { ArticleListComponent } from "../article-list/article-list.component";
import { ArticlesApiService } from "../../api/articles-api.service";
import { of, concat, BehaviorSubject, timer } from 'rxjs';
import { switchMap, tap, concatMap, skip, retryWhen, takeUntil, delayWhen } from 'rxjs/operators';
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  public articles: Article[] = [];
  public placeholders:any[]
  public updateMasonryLayout:boolean = false;
  private scrollSubject = new BehaviorSubject(1)
  private scroll$ = this.scrollSubject.asObservable()

  public searchError = false;
  public searchErrorMessage = 10;
  private errorSubject = new BehaviorSubject(true)
  public error$ = this.errorSubject.asObservable().pipe(skip(3),tap(result => {
      this.searchError = false
      this.placeholders = []
  }));
  private errorTimeout;

  @ViewChild(ArticleListComponent, { static: false })
  articleList: ArticleListComponent;

  constructor(
    private articlesApi:ArticlesApiService,
    private state: StateService,
  ) {  }

  ngOnInit() {    

    this.state.selectedPcrc$.pipe(
      tap(pcrc => {
        this.articles = []
        this.placeholders = []
        this.scrollSubject.next(1)
        this.searchError = false                        
        clearInterval(this.errorTimeout)
        this.searchErrorMessage = 10
      })
    ).subscribe()

    this.scroll$.pipe(
      tap(value => this.placeholders = [1,2,3]),
      concatMap(value => this.articlesApi.getSelfFavorites(
        this.articles.length,
        6,
        this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString()
      )),
      retryWhen(errors => {
        return errors.pipe(
            tap(errors => {
                this.errorSubject.next(true)                        
                this.placeholders = []                        
            }),
            takeUntil(this.error$),
            tap(result => {
                this.searchError = true
                this.errorTimeout = setInterval(()=>{
                    this.searchErrorMessage--
                },1000)
            }),
            delayWhen(() => timer(10*1000)),
            tap(() => {
                console.log('retrying...')   
                this.searchError = false                        
                clearInterval(this.errorTimeout)
                this.searchErrorMessage = 10
            }))
    }),

      tap(articles => {
        this.articles = this.articles.concat(articles)
        this.placeholders = []
      })
    ).subscribe()

  }

  onScroll(event){
    this.scrollSubject.next(1)
  }

  onDeleteFavorite(article:Article){
    this.articles = this.articles.filter( _article => _article.id != article.id)
    this.articlesApi.getSelfFavorites(this.articles.length + 1 , 1, this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString()).subscribe(articles => {
      this.articles = this.articles.concat(articles)
    })
  }

}