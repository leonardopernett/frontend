import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-totalvista',
  template: '<h1>Total Vista</h1>',
})
export class RedirectTotalVistaComponent implements OnInit {

  constructor(
    public router:Router,
    public elem: ElementRef
  ) { }

  ngOnInit() {
    this.router.navigate(['/app/reports/totalvista'])
  }

}