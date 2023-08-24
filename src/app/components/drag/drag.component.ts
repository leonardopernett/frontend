import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent {

  todo = ['Get to work', 'Pick up groceries', 'learning angular'];
  
  data=[
    {
      id:1,
      name:'done1',
      value:[]
    },
    {
      id:2,
      name:'done2',
      value:[]
    },
    {
      id:3,
      name:'done3',
      value:[]
    }
  ]

 
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  validar(){
    this.data.map(item=>console.log(item.id, item.value))
  }
}
