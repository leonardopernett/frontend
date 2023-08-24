import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { StateService } from "../../services/state.service";
import { googleAnalytics } from "../../services/googleAnalytics.service";
import { UserService } from "../../services/user.service";
import { ArticlesWebSocketsService } from "../../webSockets/articles-web-sockets.service";
import { UserApiService } from "../../api/user-api.service";
import { AutenticateApiService } from '../../api/autenticate-api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-aplication',
    templateUrl: './aplication.component.html',
    styleUrls: ['./aplication.component.css']
})
export class AplicationComponent implements OnInit,AfterViewInit {

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
      this.userApi.endUserSesion().subscribe()
    }

    constructor(
        public state: StateService,
        public googleAnalytics: googleAnalytics,
        public userService: UserService,
        public userApi: UserApiService,
        public articlesWebSockets: ArticlesWebSocketsService,
        public autenticateApi: AutenticateApiService,
        public router: Router
    ) {
        

    }

    ngAfterViewInit(){

      if(localStorage.getItem('userpcrc')===null){

        localStorage.removeItem('selectedClienteId')
        localStorage.removeItem('selectedPcrcId')
        this.autenticateApi.logOut()
        this.router.navigate(['/'])

      }

    }

    ngOnInit() {
        this.googleAnalytics.login(this.state.getValueOf('user').sub)
        this.articlesWebSockets.connect()
    }





}
