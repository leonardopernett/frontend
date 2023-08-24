import { Component, OnInit } from '@angular/core';
import * as ClassicEditor  from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {
  public editor = ClassicEditor

  constructor() { }

  ngOnInit() {
  }

}
