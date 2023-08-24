import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-totalarticulo',
  template: '<h1>Total Articulo</h1>',
})
export class RedirectTotalArticuloComponent implements OnInit {

  constructor(
    public router:Router,
    public elem: ElementRef
  ) { }

  ngOnInit() {
    this.router.navigate(['/app/reports/totalarticulo'])
  }

}
