import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consolidado'
})
export class ConsolidadorPipe implements PipeTransform {

  transform(value, args) {
        if(args.toLowerCase() <= 3 ){
          return value
        }
        let result =  []
          value.forEach( item =>{
            if(item.pcrc.toLowerCase().indexOf(args.toLowerCase()) != -1 ){
              return result.push(item)
            }
         })

      return result 
  }

}