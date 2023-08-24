import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(value: any, args:any) {
      let result = []
      if(args.length < 3){
         return value
      }
        value.forEach(item => {
          if(item.title.toLowerCase().includes(args.toLowerCase())){
             result.push(item)
          }
         });
      
  
      return result
  }

}
