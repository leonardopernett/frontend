import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-articleplaceholder',
  templateUrl: './articleplaceholder.component.html',
  styleUrls: ['./articleplaceholder.component.css']
})
export class ArticleplaceholderComponent  {
  
  @Input() type: string;



}
