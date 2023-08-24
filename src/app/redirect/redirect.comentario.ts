import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-comentarios',
  template: '<h1>comentario</h1>',
})
export class RedirectComentarioComponent implements OnInit {

  constructor(
    public router:Router,
    public elem: ElementRef
  ) { }

  ngOnInit() {
    this.router.navigate(['/app/reports/comentarios'])
  }

}
