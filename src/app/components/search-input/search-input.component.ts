import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  @Output() onConfirm = new EventEmitter();
  @ViewChild('input', { static: false }) input: ElementRef;

  constructor() {  }

  ngOnInit() {
  }

  search() {
    this.onConfirm.next(this.input.nativeElement.value)
    console.log(this.input.nativeElement.value)
  }

}