import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from '../../article';
import { Router,ActivatedRoute } from '@angular/router';
import { StateService } from "../../services/state.service";
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @Input() article;

  @Output() onPostLike = new EventEmitter<Article>();
  @Output() onDeleteLike = new EventEmitter<Article>();
  
  @Output() onPostDisLike = new EventEmitter<Article>();
  @Output() onDeleteDisLike = new EventEmitter<Article>();

  @Output() onPostFavorite = new EventEmitter<Article>();
  @Output() onDeleteFavorite = new EventEmitter<Article>();
  @Output() imageLoaded = new EventEmitter<boolean>();

  public listDissmised = true;
  public hasLongList;
  resumen:[]
  
  constructor(
    private articlesApi:ArticlesApiService,
    public router: Router,
    public active: ActivatedRoute,
    private stateService:StateService
  ) { }
 
  ngOnInit() {

  }

  public imageSrc:string;
  public links:{href:string, text:string}[] = [];

  imageLoad(){
    this.imageLoaded.next(true)
  }

  ngAfterViewInit(){

    setTimeout(() => {

      if(this.article.id_otros!=null){

        if (this.article.highlight===undefined) {

          this.resumen = this.article.content.split('.').slice(0,2);
          
        }else{

        if(Array.isArray(this.article.highlight)){        
  
          this.resumen = this.article.highlight.map(frase => frase)
  
        }else{

          this.resumen = this.article.highlight.split('.').slice(0,2);
  
        }

      }
  
        this.imageSrc = "../../assets/banner.gif";
  
        }

        if(this.article.id_otros===null){

          if (this.article.highlight===undefined) {

            this.resumen = this.article.content.split('.').slice(0,2);
            
          }else{
  
          if(Array.isArray(this.article.highlight)){        
    
            this.resumen = this.article.highlight.map(frase => frase)
    
          }else{
  
            this.resumen = this.article.highlight.split('.').slice(0,2);
    
          }
  
        }

      let articleObj = JSON.parse(this.article.obj);
      

      let images = articleObj.ops.filter( (op:{insert:object}) => op.insert['image'] )
      
      if(images.length){
        images = images.map(image => image['insert']['image'])
        this.imageSrc = images[0];
      }

      let links = articleObj.ops.filter( (op:{insert:Object,attributes:Object}) => {
        return op.attributes && op.attributes['link']
      })

      if(links.length){
        links = links.map(link => ({ href:link['attributes']['link'], text:link['insert'] }))
        links = links.slice(0,3);
        this.links = links;
      }

        }


    })

  }

  searchTag(tag){    
    this.router.navigate(['/app/search'], { queryParams: { tag: tag } })
  }

  goToArticleEdition(){
    if(this.article.type == 'news'){
      this.router.navigate(['/app/newseditor', this.article.id ])

    } else {
      this.router.navigate(['/app/articlecreation'], { queryParams: { articleId: this.article.id } })

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
        if(this.article.favoritos == result.favoritos + 1){
          this.onDeleteFavorite.next(this.article)
        }
        this.article.favoritos = result.favoritos
      })
    ).subscribe()
  }

}