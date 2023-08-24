import { Directive, TemplateRef, ViewContainerRef, HostListener, HostBinding } from '@angular/core';
import { StateService } from "./services/state.service";
import { tap, switchMap } from 'rxjs/operators';
import { PcrcApiService } from "./api/pcrc-api.service";

@Directive({
  selector: '[disableSelect]'
})

export class DisableSelectDirective {

  private contentIsBlocked = true;
  private intervalAux: number;


  @HostBinding('style.user-select')
  userSelect: string;

  @HostListener('selectstart', ['$event'])
  selectstartHandler($event: any) {
    if(
      this.contentIsBlocked 
      && this.state.getValueOf('user').rol  == 'user' 
      /* && this.state.getValueOf('user').sub !== '1047419466'
      && this.state.getValueOf('user').sub !== '1102850901' */
    ){

      $event.cancelBubble = true;
      $event.stopImmediatePropagation();
      $event.preventDefault();
      return false
    }
  }

  @HostListener('copy', ['$event'])
  copyHandler($event: any) {
    if(this.contentIsBlocked && this.state.getValueOf('user').rol == 'user'){

      $event.clipboardData.setData('plain', 'El copiado de texto no esta permitido');
      $event.cancelBubble = true;
      $event.stopImmediatePropagation();
      $event.preventDefault();
    }
  }

  @HostListener('cut', ['$event'])
  cutHandler($event: any) {
    if(this.contentIsBlocked && this.state.getValueOf('user').rol == 'user'){

      $event.clipboardData.setData('plain', 'El copiado de texto no esta permitido');
      $event.cancelBubble = true;
      $event.stopImmediatePropagation();
      $event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  pasteHandler($event: any) {
    if(this.contentIsBlocked && this.state.getValueOf('user').rol == 'user'){

      $event.clipboardData.setData('plain', 'El copiado de texto no esta permitido');
      $event.cancelBubble = true;
      $event.stopImmediatePropagation();
      $event.preventDefault();
    }
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick($event) {
    if(this.contentIsBlocked && this.state.getValueOf('user').rol == 'user' ){
      console.log( this.state.getValueOf('user').sub)
      $event.cancelBubble = true;
      $event.stopImmediatePropagation();
      $event.preventDefault();
    }
  }

  @HostListener('dragstart', ['$event'])
  dragHandler($event: any) {
    if(this.contentIsBlocked && this.state.getValueOf('user').rol == 'user'){
      $event.cancelBubble = true;
      $event.stopImmediatePropagation();
      $event.preventDefault();
    }
  }

  constructor(
    private state: StateService,
    private pcrcApi: PcrcApiService
  ) {
    if (this.state.getValueOf('user').rol == 'user') {

      this.state.permisoCopiar$.pipe(
        tap(puede_copiar => {

          if (puede_copiar) {

            this.contentIsBlocked = false;

            this.userSelect = 'unset';
            
            window.clearInterval(this.intervalAux)
            
          } else {
            
            this.userSelect = 'none'

            this.contentIsBlocked = true;

            this.intervalAux = window.setInterval(() => {

              if ((document as any).selection && (document as any).selection.empty) {
                (document as any).selection.empty();
              } else if (window.getSelection) {
                var sel = window.getSelection();
                if (sel.type == "Range") {
                  sel.removeAllRanges();
                }
              }

              navigator.clipboard.writeText('El copiado de texto no esta permitido').then(() => {

              }).catch(() => {

              })
            }, 200)

          }
        })
      ).subscribe()

    }
  }

}