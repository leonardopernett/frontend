import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { da } from 'date-fns/locale';
import { data } from 'jquery';
import { StateService } from 'src/app/services/state.service';

import { UserApiService } from 'src/app/api/user-api.service';
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  @Input() data 

  @Input()  child
  @Input()  childText
  @Input()  dataText
  @Output() onChildSeleccionado = new EventEmitter();

  constructor(private state:StateService, private user:UserApiService) {  }

  ngOnInit() { 
    this.verify()
 
    this.data = this.data.sort((a,b) => {
      if(a.ciente < b.clinete) return -1
      if(a.cliente> b.cliente) return 1
      return 0
    })
  
  }

  childSeleccionado(event){
    this.onChildSeleccionado.next(event)
    localStorage.removeItem('categoria');
  }


  verify(){
     this.user.getUser(this.state.getValueOf('user').sub).subscribe()
  }

}