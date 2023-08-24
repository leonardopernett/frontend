import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from "../../services/state.service";
import { NewsListEditableComponent } from "../news-list-editable/news-list-editable.component";
import { news } from "../../api/news-api.service";
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-news-creator',
  templateUrl: './news-creator.component.html',
  styleUrls: ['./news-creator.component.css']
})
export class NewsCreatorComponent implements OnInit {

  @ViewChild(NewsListEditableComponent, { static: false })
  newslist: NewsListEditableComponent

  listMode: 'archived' | 'published' = 'published';

  addNewsMode = false;

  constructor(
    private router: Router,
    public state: StateService
  ) {  }

  ngOnInit() { 
    this.state.newDraft$.pipe(
      tap(draft => { 
        this.onNewDraft(draft)
        this.listMode = 'archived';
      })
    ).subscribe()
  }



  onAddNews() {
    this.router.navigate(['/app/newseditor', 'new'])
  }

  onNewsEdit(newsId: string) {
    this.state.onIdNewsOnEdition(newsId)
    this.router.navigate(['/app/newseditor', newsId])
  }

  onNewsDeleted(newsId: string) {
    if(this.state.getValueOf('idNewsOnEdition') == newsId){
      this.router.navigate(['/app/newseditor'])
    }
  }

  onNewDraft(draft:news){
    this.newslist.concatNews(draft)
  }

}