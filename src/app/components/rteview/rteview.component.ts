import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, HostListener, OnDestroy, Output, EventEmitter,AfterViewChecked } from '@angular/core';
import Quill from 'quill';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
	selector: 'app-rteview',
	templateUrl: './rteview.component.html',
	styleUrls: ['./rteview.component.css']
})
export class RTEViewComponent implements  AfterViewInit,AfterViewChecked {

	@Output('contador') contador=new EventEmitter()


	@ViewChild('RTE', { static: false }) RTE: ElementRef;

	editor: any; 

	constructor() { }

	ngAfterViewChecked(): void {
		
		
		Array.from(document.querySelectorAll('a[target="_blank"]'))
       .forEach(link => link.removeAttribute('target'));
		
	}

	@HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

	this.contador.emit(0)
    
  }

	setContent(content) {
	
		this.editor.setContents(content)
	}

	ngAfterViewInit() {

		this.editor = new Quill(this.RTE.nativeElement, this.options);
		// Add fonts to whitelist

	}

	setHtmlContent(htmlString){
		this.editor.clipboard.dangerouslyPasteHTML(htmlString)
	}

	modules = {
		toolbar: {
			enable: false
		}
	}

	options = {
		modules: this.modules,
		placeholder: 'Contenido del articulo ...',
		readOnly: true,
		theme: 'bubble'
	};

}
