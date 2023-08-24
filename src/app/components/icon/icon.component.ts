import { Component, OnInit, Input, OnChanges,ViewContainerRef, ViewChild,SimpleChanges, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit , OnChanges{

    ngOnChanges(changes:SimpleChanges): void {
        if(!changes.iconName.isFirstChange()){
            this.renderer.removeChild(this.element,this.element.childNodes[0])
            let span = document.createElement('span');
            this.renderer.addClass(span,'iconify');
            this.renderer.setAttribute(span,'data-icon',changes.iconName.currentValue);
            this.renderer.setStyle(span,'font-size','1.5rem');

            this.renderer.appendChild(this.element,span);
        }
    }

    private element:any;

    constructor(private el: ElementRef, private renderer:Renderer2) {
        this.element = el.nativeElement;
    }

    @Input() iconName: string;

    ngOnInit() {

    }

}
