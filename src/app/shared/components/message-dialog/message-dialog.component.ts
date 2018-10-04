import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface IMsgDialogData {
  message: string;
  translateParams: { [key: string]: string };
}

@Component({
  selector: 'afg-message-dialog',
  templateUrl: './message-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IMsgDialogData) { }
}
