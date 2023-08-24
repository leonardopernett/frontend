import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zendesk'
})
export class ZendeskPipe implements PipeTransform {

  transform(value, args) {

    if(value===undefined){
      return "";
    }
  
    let resultado=[]

    value.forEach(element => {
      //element.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      for (let i = 0; i < element.length; i++) {
        if(element.charAt(i) == "ó"){
           element =  element.charAt("ó").replace("ó","o")
           
        }

        if(element.charAt(i) == "é"){
          element =  element.charAt("é").replace("é","o")
          
       }
      }

        if(element.title.toLowerCase().indexOf(args.toLowerCase())!=-1){
            resultado.push(element)
        }
           
        
    });

    return resultado;

  

  }
    
  

}