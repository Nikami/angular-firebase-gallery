import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[afgInputSelection]'
})
export class InputSelectionDirective {
  @HostListener('focus', ['$event.target'])
  onFocus(input: HTMLInputElement): void {
    input.setSelectionRange(0, input.value.length);
  }
}
