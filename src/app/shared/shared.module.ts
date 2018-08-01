import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileSizePipe } from './pipes/file-size.pipe';


const COMPONENTS = [DropZoneDirective, FileUploadComponent, FileSizePipe];

const services = [];

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule],
  declarations: [...COMPONENTS],
  exports: [MaterialModule, TranslateModule, ...COMPONENTS],
  providers: [...services]
})
export class SharedModule {}
