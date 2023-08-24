import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/article';
import { ArticlesApiService } from "../../api/articles-api.service";
import { categoryRaw } from "../../api/categories-api.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-short-article-list',
  templateUrl: './short-article-list.component.html',
  styleUrls: ['./short-article-list.component.css']
})
export class ShortArticleListComponent implements OnInit {

  @Input() category:categoryRaw;
  @Output() onArticleSelected = new EventEmitter();

  private pageSize:number = 10;
  public articleList:Article[] = [{ 
    title:'Cualquiera',
    content:'',
    highlight:{
      content: []
    },
    obj:'',
    vistas:0 
  }];
  public currentSearch:string;

  constructor(private articlesApi:ArticlesApiService) {  }

  ngOnInit() { 
    this.onScroll();
  }

  search(text:string){
    this.currentSearch = text;   
    this.articleList = []; 
    this.onScroll();
  }
  
  articleSelected(article){
    this.onArticleSelected.next(article);
  }

  onScroll(){
    this.articlesApi.getArticlesByCategory(this.category.id, '1', this.articleList.length-1, this.pageSize, this.currentSearch).pipe(
      tap(articles => this.articleList = this.articleList.concat(articles))
    ).subscribe()
  }

}
