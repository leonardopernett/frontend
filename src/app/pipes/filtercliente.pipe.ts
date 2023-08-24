import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterclient'
})
export class FilterClientePipe implements PipeTransform {

  transform(value, args) {
    if(args=="" || args.length <3){
      return value
    }
    let result= []
    for(const item of value){
      if(item.nombre.toLowerCase().indexOf(args.toLowerCase()) != -1){
        result.push(item)
      }
    }

    return result;
  }

}