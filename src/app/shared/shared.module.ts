import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { InputSelectionDirective } from './directives/input-selection.directive';


const COMPONENTS = [DropZoneDirective, FileSizePipe, InputSelectionDirective];

const services = [];

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule],
  declarations: [...COMPONENTS],
  exports: [MaterialModule, TranslateModule, ...COMPONENTS],
  providers: [...services]
})
export class SharedModule {}
