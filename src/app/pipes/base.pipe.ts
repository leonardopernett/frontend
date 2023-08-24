import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base'
})

export class BasePipe implements PipeTransform {
     transform(value:any , args:any){
         if(value){
             return value.slice(args, args + 5)
         }
     
     }
}