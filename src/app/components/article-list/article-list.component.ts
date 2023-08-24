import { Component, Input } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Article } from "../../article";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent  {

  @Input() articles:Article[] = [];
  @Input() placeholders:any[] = [];

 

  updateMasonryLayout = false;

  masonryOptions:NgxMasonryOptions = {
    gutter: 16
  }

}