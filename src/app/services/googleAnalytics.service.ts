import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
    providedIn: 'root'
})
export class googleAnalytics {
    public pagePath = (path:string) => {
       
        gtag('config', 'UA-159453436-1',
        {
          'page_path': path
        }
       );
    }
    
    public pageView = (path:string) => {
      
        gtag('config', 'UA-159453436-1',
            {
                'pageview': path
            }
       );
    }

    public sendEvent(
        eventName: string,
        eventCategory: string,
        eventLabel: string = null,
        eventValue: number = null ){
            gtag('event', eventName, {
                     event_category: eventCategory,
                     event_label: eventLabel,
                     value: eventValue
            })
    }    

    public timing(
        eventCategory: string,
        eventLabel: string = null,
        eventValue: number = null ){
            gtag('event', 'timing_complete', {
                name : 'load',
                value : eventValue,
                event_category : eventCategory,
                event_label : eventLabel
              })
    }

    public login( userid:string ){
        gtag('set', { 'user_id': userid });
    }

    public setDimension(
        index:number,
        dimension_name:string,
        dimension_value:string
    ){
        let objAux = {}
        let objAux1 = {}

        objAux[`dimension${index}`] = dimension_name        
        objAux1[dimension_name] = dimension_value


        gtag('config', 'UA-159453436-1', {
            'custom_map': objAux
          });

        gtag('event', 'custom_dim', objAux1);
    }

}