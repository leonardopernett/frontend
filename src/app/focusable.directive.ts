import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[focusable]',
})
export class FocusableDirective {
  @HostListener('click', ['$event']) c(evt) { this.onClickFocus(evt); }
  @HostListener('blur', ['$event']) b(evt) { this.onBlur(evt); }
  @HostListener('focus', ['$event']) f(evt) { this.onClickFocus(evt); }
  @Output('focused') focused = new EventEmitter();
  @Output('notFocused') notFocused = new EventEmitter();

  onceFocused: boolean; // set when element is clicked or focused

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute('tabindex', '0');
    const focusableEls = this.el.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableEls.forEach(el => {
      const evtBlur = el.addEventListener('blur', this.onBlur );
      const evtFocus = el.addEventListener('focus', this.onClickFocus );
    });
  }

  // when clicked/clicked, set focused attribute
  onClickFocus = event => {
    this.setFocused(true);
    this.onceFocused = true;
    setTimeout( _ => this.onceFocused = false, 100);
  }

  // when blur, remove focused attribute
  // case 1. blur by focusing inside el. `click` happed before it.
  // case 2. by focusing outside el.
  onBlur = event => {
    setTimeout(_ => !this.onceFocused && this.setFocused(false), 100);
  }

  setFocused(focused) {
    const attrSet = this.el.nativeElement.classList.contains('focused');
    (!attrSet && focused) && this.focused.emit(true);
    (attrSet && !focused) && this.notFocused.emit(false);

    const method = focused ? 'add' : 'remove';
    this.el.nativeElement.classList[method]('focused');
  }

}