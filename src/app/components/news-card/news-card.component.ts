import { Component, OnInit, Input } from '@angular/core';
import { news } from "../../api/news-api.service";
import { ArticlesApiService } from '../../api/articles-api.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  constructor(private articlesApi:ArticlesApiService) { }

  public resumen:string[] = [];
  public imageSrc:string;
  public links:{href:string, text:string}[] = [];

  @Input() news:any;
  @Input() article:any;

  ngOnInit() {

    console.log(this.news)

    if(this.resumen.length == 0){
      this.resumen = this.news.content.split('.').slice(0,2);
    }

    let newsObj = JSON.parse(this.news.obj);

    let images = newsObj.ops.filter( (op:{insert:object}) => op.insert['image'] )
    
    if(images.length){
      images = images.map(image => image['insert']['image'])
      this.imageSrc = images[0];
    }

    let links = newsObj.ops.filter( (op:{insert:Object,attributes:Object}) => {
      return op.attributes && op.attributes['link']
    })

    if(links.length){
      links = links.map(link => ({ href:link['attributes']['link'], text:link['insert'] }))
      links = links.slice(0,3);
      this.links = links;
    }

  }


  addLike() {
    this.articlesApi.postLike(this.article.id).pipe(
      tap(result => {
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

  addToFavorites() {
     this.articlesApi.postFavorite(this.article.id).pipe(
      tap(result => {
        this.article.favoritos = result.favoritos
      })
    ).subscribe() 
  }

}
