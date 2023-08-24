import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { notification } from "../../webSockets/articles-web-sockets.service";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { ArticlesApiService } from "../../api/articles-api.service";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() notification:notification;  

  articleTitle:string;

  constructor(
    private router: Router,
    private articlesWebSockets: ArticlesWebSocketsService,
    private articlesApi: ArticlesApiService
  ){  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.notification){
      if(changes.notification.currentValue.event == 'newComment'){
        this.articlesApi.getArticle(changes.notification.currentValue.data.articulo)
        .subscribe(article => {
          this.articleTitle = article.title
        })
      }
    }
  }

  goToArticle(){
    // this.articlesWebSockets.deleteNotification(this.notification.id)
    // .subscribe()
    // this.articlesWebSockets.togleNotifications()
    // this.router.navigate(['/app/articles/' + this.notification.data.id])
  }

}