import { Component, OnInit } from '@angular/core';
import { StateService } from "../../services/state.service";
import { user } from "../../api/user-api.service";
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserApiService } from "../../api/user-api.service";
import { PcrcApiService } from "../../api/pcrc-api.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-usersconfig',
  templateUrl: './usersconfig.component.html',
  styleUrls: ['./usersconfig.component.css']
})
export class UsersconfigComponent implements OnInit {

  constructor( 
    public state:StateService,
    public userApi:UserApiService,
    public pcrcApi:PcrcApiService,
    private translate:TranslateService
  ) {  }

  ngOnInit() {

     this.state.selectedPcrc$.subscribe( pcrc =>{
      this.state.loadPcrcUsersList()
    })

    this.state.loadPcrcUsersList() 
  }

  public roles:user['rol'][] = ["admin",this.translate.instant('Publicador'),"user"]

  userRolChange = ({value}) => {
    of(value).pipe(
      switchMap(rol => this.userApi.updateUserRol(this.state.getSelectedUser().cedula, rol))
    ).subscribe()
  }

  darAccesoTodos = () => {

    this.state.newSelectedUserPcrcState({state:"loading"})

    this.userApi.postUserPcrc(this.state.getValueOf("selectedUser").cedula,'todos').pipe(
      switchMap(result => this.pcrcApi.getUserPcrc(this.state.getValueOf("selectedUser").cedula,0,1000)),
      tap(pcrcs => {
        this.state.newSelectedUserPcrc(pcrcs)        
        this.state.newSelectedUserPcrcState({state:"finish"})
      })
    ).subscribe()
  }
  
  quitarAccesoTodos = () => {
    this.state.newSelectedUserPcrcState({state:"loading"})

    this.userApi.deleteUserPcrc(this.state.getValueOf("selectedUser").cedula,'todos').pipe(
      switchMap(result => this.pcrcApi.getUserPcrc(this.state.getValueOf("selectedUser").cedula,0,1000)),
      tap(pcrcs => {
        this.state.newSelectedUserPcrc(pcrcs)
        this.state.newSelectedUserPcrcState({state:"finish"})
      })
    ).subscribe()
  }
}