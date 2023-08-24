import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EventsService } from './services/index';
import { Title } from "@angular/platform-browser";
import { googleAnalytics } from "./services/googleAnalytics.service";
import { ArticlesWebSocketsService } from "./webSockets/articles-web-sockets.service";
import { environment } from '../environments/environment';
import { VersionApiService } from "./api/version.service";
import { SocketService } from './services/socket.service';
@Component({
    selector: 'app-root',
    styles: [],
    templateUrl: './app.component.html',
    providers: [Title] 
})
export class AppComponent implements OnInit {
    constructor(
        public events: EventsService,
        public router: Router,
        public route: ActivatedRoute,
        public title: Title,
        public googleAnalytics:googleAnalytics,
        public articlesWebSockets:ArticlesWebSocketsService,
        public versionApi:VersionApiService,
        
    ) {  }

    ngOnInit() {

        if(environment.production){
            this.versionApi.getFrontVersion().subscribe(resutl =>{
                if(resutl.version != environment.version){
                    window.location.reload();
                }
            })
            
            window.setInterval( () => {
                this.versionApi.getFrontVersion().subscribe(resutl =>{
                    if(resutl.version != environment.version){
                        window.location.reload();
                    }
                })
            }, 1000*60 )
        }

        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd){
                this.googleAnalytics.pagePath(event.urlAfterRedirects)
            }
        })

        this.events.onNewSearch$.subscribe(newSearch => {
            if (newSearch) {
                this.title.setTitle(newSearch);
                this.router.navigate(['/app/search'], { queryParams: { query: newSearch } })
            }
        })

        this.route.queryParamMap.subscribe(params => {
            if (params.has("query")) {
                this.events.newQuery(params.get('query'));
            }
        })
    }

}
