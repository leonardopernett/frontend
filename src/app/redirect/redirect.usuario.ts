import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-usuario',
  template: '<h1>usuario</h1>',
})
export class RedirectUsuarioComponent implements OnInit {

  constructor(
    public router:Router,
    public elem: ElementRef
  ) { }

  ngOnInit() {
    this.router.navigate(['/app/reports/usuario'])
  }

}