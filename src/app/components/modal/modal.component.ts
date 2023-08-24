import { Component, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'jw-modal',    
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    @Output() onClose = new EventEmitter();

    private element: any;    


    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        this.modalService.add(this);
        this.open();

        this.el.nativeElement.addEventListener('click',()=>{
            this.close();
        })
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
        
    }

    // close modal
    close(): void {
        // this.element.style.display = 'none';
        // document.body.classList.remove('jw-modal-open');        
        this.onClose.next(true);
    }
}