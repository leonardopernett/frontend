import { Component, OnInit } from '@angular/core';
import { news } from "../../api/news-api.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  selectedSubLine:string = "";
  newsList:news[] = [];
  public maxDate: Date = new Date();
  public minDate: Date = new Date(2019, 9 , 30);
  public selectedDate:Date = new Date();


  constructor(){ 

  }
  
  ngOnInit(){  }

  onChange(event){
    this.selectedDate = event.value;
    this.selectedDate.setHours(23)
  }
}