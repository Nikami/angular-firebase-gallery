import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';
import { DropFileDirective } from './directives/drop-file.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { InputSelectionDirective } from './directives/input-selection.directive';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { SessionDialogComponent } from './components/session-dialog/session-dialog.component';
import { MsToTimePipe } from './pipes/ms-to-time.pipe';
import { OnloadDirective } from './directives/onload.directive';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerModule } from '../spinner';
import { CommonModule } from '@angular/common';

const COMPONENTS = [
  DropFileDirective,
  FileSizePipe,
  MsToTimePipe,
  InputSelectionDirective,
  DragAndDropDirective,
  MessageDialogComponent,
  SessionDialogComponent,
  OnloadDirective
];

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule, SpinnerModule],
  declarations: [...COMPONENTS],
  exports: [
    MaterialModule,
    BrowserModule,
    TranslateModule,
    SpinnerModule,
    ...COMPONENTS
  ],
  entryComponents: [MessageDialogComponent, SessionDialogComponent]
})
export class SharedModule {}
