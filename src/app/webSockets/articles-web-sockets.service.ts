import { Injectable } from '@angular/core';
import { tap, map, distinctUntilChanged, scan, filter, switchMap } from 'rxjs/operators';
import io from 'socket.io-client';
import { StateService } from "../services/state.service";
import { UserService } from "../services/user.service";
import { BehaviorSubject, forkJoin } from 'rxjs';
import { UserApiService } from "../api/user-api.service";
import { environment } from '../../environments/environment';

export type state = {
  notificationsOpen:boolean,
  notifications:notification[],
  commentNotifications:notification[]
}

export type notification = {
  date:string,
  event:string,
  room:string,
  id:string,
  data:any
}

export type posibleEvents = 'newarticle' | 'articleUpdate' | 'nuevanoticia' | 'newComment'

@Injectable({
  providedIn: 'root'
})
export class ArticlesWebSocketsService {

  private _state:state = {
    notificationsOpen:false,
    notifications:[],
    commentNotifications:[],
  }

  private store = new BehaviorSubject<state>(this._state)
  
  private state$ = this.store.asObservable()

  public notificationsOpen$ = this.state$.pipe(map(_state => _state.notificationsOpen), distinctUntilChanged())
  public notifications$ = this.state$.pipe(map(_state => _state.notifications), distinctUntilChanged())
  public commentNotifications$ = this.state$.pipe(map(_state => _state.commentNotifications), distinctUntilChanged())

  private socket

  constructor(
    private userService:UserService,
    private state:StateService,
    private userApi:UserApiService,
  ) {  }

  public connect(){
    // this.socket = io(`${environment.endpoint}/articles`,{ query: { cedula: this.state.getValueOf('user').sub }})

    // this.socket.on('connect', () => {
    //   this.socket.on('newarticle', data => {
    //     this.storeNotification(data)
    //   })

    //   this.socket.on('articleUpdate', data => {
    //     this.storeNotification(data)
    //   })

    //   this.socket.on('nuevanoticia', data => {
    //     this.storeNotification(data)
    //   })

    //   this.socket.on('newComment', data => {
        
    //     this.userApi.postUserNotification({
    //       data: data.data,
    //       date: data.date,
    //       event: data.event,
    //       notificationId: data.id,
    //       room: data.room
    //     }).subscribe()

    //     this.store.next(this._state = { ...this._state, notifications: [...this._state.notifications, {...data, data:JSON.parse(data.data)}] })

    //   })

    // });

    // this.state.selectedPcrc$.pipe(
    //   tap(pcrc => {
    //     this.subscribeToRoom(pcrc.id_dp_pcrc.toString())
    //   })
    // ).subscribe()
  }

  private storeNotification(articleNotification:notification){

    // this.userApi.postUserNotification({
    //   data: articleNotification.data,
    //   date: articleNotification.date,
    //   event: articleNotification.event,
    //   notificationId: articleNotification.id,
    //   room: articleNotification.room
    // }).subscribe()

    // this.store.next(this._state = { ...this._state, notifications: [...this._state.notifications, {...articleNotification, data:JSON.parse(articleNotification.data)}] })
    
  }

  public subscribeToRoom(roomId:string){
    // this.socket.emit('subcribe', roomId , (response:any[]) => {

    //   this.store.next(this._state = { ...this._state, notifications: [] })

    //   this.userApi.getUserNotifications(roomId).pipe(
    //     tap(userNotifications => {

    //       let notifications:notification[] = userNotifications.map( x => {
    //         return {
    //           date: x.date.toString(),
    //           event: x.event,
    //           room: x.room,
    //           id: x.notificationId,
    //           data: JSON.parse(x.data)
    //         }
    //       })

    //       this.store.next(this._state = { ...this._state, notifications: [...this._state.notifications,...notifications, ...response.map(x =>({...x,data:JSON.parse(x.data)}))] })
    //     }),
    //     switchMap(userNotifications => {
    //       let promises = response.map((notification:notification) => {
    //         return this.userApi.postUserNotification({
    //           data:notification.data,
    //           date: notification.date,
    //           event: notification.event,
    //           notificationId: notification.id,
    //           room:notification.room
    //         })
    //       })
    
    //       return forkJoin(...promises)

    //     })        
    //   ).subscribe()

    // })
  }
  
  public sendNotification(event:posibleEvents, data:any){
    // this.socket.emit(event, JSON.stringify(data))
  }

  public togleNotifications(){

    // if(this._state.notificationsOpen){
    //   this.store.next(this._state = { ...this._state, notificationsOpen:false })      
    // } else {
    //   this.store.next(this._state = { ...this._state, notificationsOpen:true })
    // }

  }

  public deleteNotification(notificationId:string){
    // return this.userApi.deleteUserNotification(notificationId).pipe(
    //   tap(result => {
    //     this.store.next(this._state = { ...this._state, notifications: [...this._state.notifications.filter(x => x.id != notificationId)] })
    //   })
    // )
  }

  public deleteAllNotifications(){
    // if(this._state.notifications.length){
    //   this.userApi.deleteAllUserNotifications(this._state.notifications[0].room).subscribe(result =>
    //     this.store.next(this._state = { ...this._state, notifications: [] })
    //   )
    // }
  }

}