import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatIconRegistry, MatCardModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

const COMPONENT_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule
];

@NgModule({
  imports: [...COMPONENT_MODULES],
  exports: [...COMPONENT_MODULES]
})
export class MaterialModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'ctc-logo',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ctc-logo.svg')
    );
    iconRegistry.addSvgIcon(
      'arrow-right',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/arrow-right.svg')
    );
  }
}
