import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StateService } from "../../services/state.service";



@Component({
  selector: 'app-tree-view-row',
  templateUrl: './tree-view-row.component.html',
  styleUrls: ['./tree-view-row.component.css']
})
export class TreeViewRowComponent implements OnInit {

  @Input() data
  @Input() child
  @Input() childText
  @Input() dataText
  @Output() onChildSeleccionado = new EventEmitter();

  public isDesplegado = false;

  constructor(public state:StateService) {  }

  ngOnInit() {  }

  childSeleccionado(index:number){
    let data = {...this.data}

    data[this.child] = [data[this.child][index] ]
    this.onChildSeleccionado.next(data)
  }
  
}
