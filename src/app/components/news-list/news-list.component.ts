import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { BehaviorSubject, merge, Observable, timer } from 'rxjs';
import { concatMap, tap, retryWhen, skip, takeUntil, delayWhen } from 'rxjs/operators';
import { news, NewsApiService } from "../../api/news-api.service";
import { StateService } from "../../services/state.service";


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnChanges {

  news: news[] = [];
  public placeholders: any[] = []
  public updateMasonryLayout: boolean = false;


  @Input()
  date: Date;

  private scrollSubject = new BehaviorSubject(1)
  private scroll$ = this.scrollSubject.asObservable()
  private news$: Observable<news[]>

  masonryOptions: NgxMasonryOptions = {
    gutter: 16
  }

  public searchError = false;
  public searchErrorMessage = 10;
  private errorSubject = new BehaviorSubject(true)
  public error$ = this.errorSubject.asObservable().pipe(skip(3),tap(result => {
      this.searchError = false
      this.placeholders = []
  }));
  private errorTimeout;

  constructor(
    private newsApiService: NewsApiService,
    private state: StateService
  ) { }

  ngOnInit() {
    let pcrc$ = this.state.selectedPcrc$.pipe(tap(pcrc => this.news = []))

    this.news$ = merge(this.scroll$, pcrc$).pipe(
      tap(value => this.placeholders = [1, 2, 3]),
      concatMap(value =>
        this.newsApiService.getNews({
          idSubline: this.state.getValueOf('selectedPcrc').id_dp_pcrc.toString(),
          state: 'published',
          from: this.news.length,
          size: 6,
          date: this.date.getTime().toString()
        })),
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
      tap(news => {
        this.news = this.news.concat(news)
        console.log(this.news)
        this.placeholders = []
      })
    )

    this.news$.subscribe()

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.date.isFirstChange()) {
      this.news = []
      this.scrollSubject.next(1);
    }
  }

  onScroll(event) {
    this.scrollSubject.next(1);
  }
}