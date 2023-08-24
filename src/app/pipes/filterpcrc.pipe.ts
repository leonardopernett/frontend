import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpcrc'
})
export class FilterPcrcPipe implements PipeTransform {

  transform(value, args) {
    if(args=="" || args.length <3){
      return value
    }
    let result= []
    for(const item of value){
      if(item.pcrc.toLowerCase().indexOf(args.toLowerCase()) != -1){
        result.push(item)
      }
    }

    return result;
  }

}