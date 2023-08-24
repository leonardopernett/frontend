import { Component, OnInit, Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { StateService, state } from "../../services/state.service";
import { PcrcApiService, cliente } from "../../api/pcrc-api.service";
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tree-view-multi',
  templateUrl: './tree-view-multi.component.html',
  styleUrls: ['./tree-view-multi.component.css']
})
export class TreeViewMultiComponent implements OnInit, AfterViewInit {

  public allpcrc$:Observable<{
    allPcrc:cliente[],
    userPcrc:cliente[],
    selectedUserPcrcs:cliente[]
  }>

  public loadingState:state['selectedUserPcrcsState']

  constructor(
    public state:StateService,
    public pcrcApi:PcrcApiService
  ) {  }

  ngOnInit() {

    this.allpcrc$ = combineLatest(
      this.pcrcApi.getAllPcrc(),
      this.state.userPcrc$,
      this.state.selectedUserPcrcs$).pipe(
        map( combinedData => ({
          allPcrc:combinedData[0],
          userPcrc:combinedData[1],
          selectedUserPcrcs:combinedData[2]
        }))
      )

    this.state.selectedUserPcrcsState$.pipe(
      tap(state => { 
        this.loadingState = state
        
      })
    ).subscribe()

  

  }

  ngAfterViewInit(){
   
  }

  childSeleccionado(event){  }

}