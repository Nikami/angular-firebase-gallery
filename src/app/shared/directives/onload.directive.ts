import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[afgOnload]',
  exportAs: 'onload'
})
export class OnloadDirective {
  @HostListener('load', ['$event'])
  private onLoad(): void {
    this.afgOnload = false;
  }

  @Input() afgOnload: boolean = true;

  constructor() {}
}
