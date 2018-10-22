import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';
import { DropFileDirective } from './directives/drop-file.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { InputSelectionDirective } from './directives/input-selection.directive';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { SessionDialogComponent } from './components/session-dialog/session-dialog.component';
import { MsToTimePipe } from './pipes/ms-to-time.pipe';
import { SpinnerDirective } from './directives/spinner.directive';
import { BrowserModule } from '@angular/platform-browser';

const COMPONENTS = [
  DropFileDirective,
  FileSizePipe,
  MsToTimePipe,
  InputSelectionDirective,
  DragAndDropDirective,
  MessageDialogComponent,
  SessionDialogComponent,
  SpinnerDirective
];

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule],
  declarations: [...COMPONENTS],
  exports: [MaterialModule, BrowserModule, TranslateModule, ...COMPONENTS],
  entryComponents: [MessageDialogComponent, SessionDialogComponent]
})
export class SharedModule {}
