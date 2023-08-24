import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Article } from "../../article";
import { ArticlesApiService } from "../../api/articles-api.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-article-editable',
  templateUrl: './article-editable.component.html',
  styleUrls: ['./article-editable.component.css']
})
export class ArticleEditableComponent implements OnInit {
  
  @ViewChild('mymodal',{static:false}) mymodal:ElementRef

  @Input() article:Article;
  @Output() onArticleDeleted = new EventEmitter();

  controles
  public isDeleted = false;
  public deleteArticleModalOpen = false;

  constructor(
    private articlesApi:ArticlesApiService,
    private router:Router
  ) { }
  
  ngOnInit() {
  }

  obtenercontrolcambio(id_articulo){

    this.articlesApi.mostrarcontrolcambio(id_articulo).subscribe(data=>{
      this.controles=data
    })

  }

  abrirmodal(){
   this.mymodal.nativeElement.style.display="block"
  }

  closeModal(){
    this.mymodal.nativeElement.style.display="none"
  }

  deleteArticle(){
    this.isDeleted = true;
    this.articlesApi.deleteArticle(this.article.id).subscribe(result => {
        this.onArticleDeleted.next(this.article.id)
    })
  }

  goToArticleEdition(){
    this.router.navigate(['/app/articlecreation'],{ queryParams: { articleId: this.article.id }})
  }

 

}