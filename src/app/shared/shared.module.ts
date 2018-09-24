import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';
import { DropFileDirective } from './directives/drop-file.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { InputSelectionDirective } from './directives/input-selection.directive';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';

const COMPONENTS = [DropFileDirective, FileSizePipe, InputSelectionDirective, DragAndDropDirective];
const services = [];

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule],
  declarations: [...COMPONENTS],
  exports: [MaterialModule, TranslateModule, ...COMPONENTS],
  providers: [...services]
})
export class SharedModule {}
