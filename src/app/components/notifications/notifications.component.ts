import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications:number = 0;

  constructor( 
    public articlesWebSockets:ArticlesWebSocketsService
  ) { }

  ngOnInit() {
    this.articlesWebSockets.notifications$.pipe(
      tap(notifications => this.notifications = notifications.length)
    ).subscribe()
  }

  clearAllNotifications(){
    this.articlesWebSockets.deleteAllNotifications()
  }

}
