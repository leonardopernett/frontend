import { AfterViewInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';



@Component({
	selector: 'app-rteviewbanco',
	templateUrl: './rteviewbanco.component.html',
	styleUrls: ['./rteviewbanco.component.css'],
	encapsulation:ViewEncapsulation.None
})
export class RTEViewBancoComponent implements OnInit,AfterViewInit{

	@Input() articulo:any


	constructor() {
		
	 }

	ngAfterViewInit() {
	
	}

	ngOnInit() {

	}

	
}
