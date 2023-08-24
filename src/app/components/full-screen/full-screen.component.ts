import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import { fromEvent } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ArticlesApiService } from "../../api/articles-api.service";
import { Article } from "../../article";
import { UserService } from "../../services/user.service";
import { RTEViewComponent } from "../rteview/rteview.component";
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {
  @ViewChild(RTEViewComponent, { static: false })
  rteview: RTEViewComponent;

  constructor(     
    public activatedRoute: ActivatedRoute,
    public renderer:Renderer2,
    public articlesApi:ArticlesApiService,
    public UserService:UserService,
    public Location:Location
  ) { }

  ngOnInit() {  }

  ngAfterViewInit(){
    this.activatedRoute.params.pipe(
        map(params => params.id),
        switchMap(articleId=>{
          return this.articlesApi.getArticle(articleId)
        })
      ).subscribe((article:Article)=>{

      this.rteview.setContent(JSON.parse(article.obj || "[]"))
    })
  }

}
