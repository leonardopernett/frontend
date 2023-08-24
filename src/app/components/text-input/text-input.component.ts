import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

    constructor() { }

    @Input() placeholder: string;
    @Input() initialText: string;
    @Input() cancelButton: boolean = true;

    @Output() onConfirm = new EventEmitter();
    @Output() onCancel = new EventEmitter();

    @ViewChild('input', { static: false }) input: ElementRef;

    ngOnInit() {
    }

    confirmar() {
        this.onConfirm.next(this.input.nativeElement.value)
    }

    cancelar() {
        this.onCancel.next(true);
    }
}
