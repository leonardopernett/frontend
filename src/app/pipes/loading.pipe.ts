import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError, tap } from 'rxjs/operators';

@Pipe({
  name: 'loading'
})
export class LoadingPipe implements PipeTransform {

  transform(val) {
    return isObservable(val)
      ? val.pipe(
        map((value: any) => {
          if(!!value.state){
            return value
          }else{
            return { state: 'finish', value:value }
          }
        }),
        startWith({ state: 'loading' }),
        catchError(error => of({ state: 'error', error:error }))
      )
      : val;
  }

}
