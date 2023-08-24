import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserApiService } from "../../api/user-api.service";
import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-users-editor-list',
  templateUrl: './users-editor-list.component.html',
  styleUrls: ['./users-editor-list.component.css']
})
export class UsersEditorListComponent implements OnInit {

  @Output() onSelectedUser = new EventEmitter();
  @Output() onNewUser = new EventEmitter();
  public todosLosPcrcCheck = false;

  
  constructor(
    private userApi:UserApiService,
    public state:StateService
  ) {  }

  ngOnInit() {  }

  deleteUser(idUsuario:string){
    // this.userApi.deleteUser(idUsuario).subscribe(result => {
    //   this.selectUser(null);
    // })
  }

  newUser(){
    // this.onNewUser.next(true)
  }

  search(text:string){
    this.state.newUsersListQuery(text)
  }

  userList(cedula){
    this.userApi.getUser(cedula)
    .subscribe(user => {
      this.state.selectUser(user)
     /*  console.log(user) */
     
    })
    
  }

}