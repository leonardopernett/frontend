import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-obligatorio',
  template: '<h1>Obligatorio</h1>',
})
export class RedirectObligatorioComponent implements OnInit {

  constructor(
    public router:Router,
    public elem: ElementRef
  ) { }

  ngOnInit() {
    this.router.navigate(['/app/reports/obligatorio'])
  }

}