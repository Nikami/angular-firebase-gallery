import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

interface ISpinnerOptions {
  isShown: boolean;
  onLoad: boolean;
}

@Directive({
  selector: '[afgSpinner]'
})
export class SpinnerDirective {
  private options: ISpinnerOptions = {
    isShown: false,
    onLoad: false
  };
  private spinnerEl: ElementRef;
  private parentEl: ElementRef;

  @HostListener('load', ['$event'])
  private onLoad(): void {
    if (this.options && this.options.onLoad) {
      this.options.isShown = false;
      this.remove();
    }
  }

  @Input()
  set afgSpinner(options: ISpinnerOptions) {
    if (options) {
      this.options = Object.assign(this.options, options);

      if (this.options.isShown) {
        this.add();
      } else if(!this.options.isShown && this.spinnerEl) {
        this.remove();
      }
    }
  }

  constructor(public el: ElementRef,
              private renderer: Renderer2) {
  }

  private add(): void {
    this.parentEl = this.renderer.parentNode(this.el.nativeElement);
    this.spinnerEl = this.renderer.createElement('div');
    this.renderer.addClass(this.spinnerEl, 'spinner');
    this.renderer.appendChild(this.parentEl, this.spinnerEl);
  }

  private remove(): void {
    setTimeout(() => this.renderer.removeChild(this.parentEl, this.spinnerEl), 200);
  }
}
