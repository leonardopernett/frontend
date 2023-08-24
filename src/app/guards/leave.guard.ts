import { Injectable } from '@angular/core';
import { ArticleViewComponent } from "../components/article-view/article-view.component";
import { ArticlesApiService } from "../api/articles-api.service";
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanLeaveArticleGuard implements CanDeactivate<ArticleViewComponent> {

  constructor(private articlesApiService:ArticlesApiService){  }

  canDeactivate(articleViewComponent: ArticleViewComponent): boolean {

     articleViewComponent.sendViewInfo() 

    return true;
  }
}