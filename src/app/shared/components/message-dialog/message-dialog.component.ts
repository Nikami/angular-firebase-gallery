import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export enum MessageDialogActions {
  CANCEL = 'CANCEL',
  OK = 'OK',
  CLOSE = 'CLOSE'
}

export interface IMsgDialogData {
  message: string;
  translateParams: { [key: string]: string };
  actions: MessageDialogActions[];
}

@Component({
  selector: 'afg-message-dialog',
  templateUrl: './message-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDialogComponent implements OnInit {
  public actions = {
    OK: false,
    CANCEL: false,
    CLOSE: false
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: IMsgDialogData) {}

  ngOnInit(): void {
    this.data.actions.forEach((action: MessageDialogActions) => {
      this.actions[action] = true;
    });
  }
}
