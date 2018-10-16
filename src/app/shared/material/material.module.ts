import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatIconRegistry,
  MatCardModule,
  MatMenuModule,
  MatTooltipModule,
  MatTabsModule,
  MatDialogModule,
  MatSlideToggleModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

const COMPONENT_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatTooltipModule,
  MatTabsModule,
  MatDialogModule,
  MatSlideToggleModule
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
    //iconRegistry.addSvgIcon(
    //  'afg-spinner',
    //  sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/spinner.svg')
    //);
  }
}
