import { EventEmitter, Injectable } from "@angular/core";


@Injectable({providedIn:'root'})

export class TotalService{

     public total = new EventEmitter()
}