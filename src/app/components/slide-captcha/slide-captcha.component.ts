import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slide-captcha',
  templateUrl: './slide-captcha.component.html',
  styleUrls: ['./slide-captcha.component.css']
})
export class SlideCaptchaComponent implements OnInit {

  @ViewChild('box', { static: false }) box: ElementRef;
  @Output() validado = new EventEmitter();

  slide = false;
  captchaValidado = false
  mouseMovement = 0;

  constructor(
  ) { }

  ngOnInit() { }

  mouseDown(e){
    if(!this.captchaValidado){
      this.reset()
      this.slide = true;        
    }
  }

  mouseUp(e){
    if(!this.captchaValidado){
      this.reset()
    }
  }

  mouseMove(e){
    if(!this.captchaValidado){
      if(this.slide){
        if(this.mouseMovement + e.movementX >= 0){
          if(this.mouseMovement + e.movementX <= 251 ){
            this.mouseMovement += e.movementX;
            this.box.nativeElement.style.left = (this.mouseMovement)+'px';
          } else {
            this.captchaValidado = true;
            this.box.nativeElement.style.left = '252px'
            this.validado.next(true)
          }
        } else {
          this.box.nativeElement.style.left = '0px';
          this.mouseMovement = 0;
        }
      }
    }      
  }

  mouseLeave(e){
    if(!this.captchaValidado){
      this.reset()
    }
  }

  private reset(){
    this.slide = false;
    this.mouseMovement = 0;
    this.box.nativeElement.style.left = '0px';
    
  }

  resetCaptcha(){
    this.reset()
    this.captchaValidado = false;
  }

  

}
