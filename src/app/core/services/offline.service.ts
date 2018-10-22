import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { MatDialog } from '@angular/material';
import {
  MessageDialogActions,
  MessageDialogComponent
} from '../../shared/components/message-dialog/message-dialog.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable()
export class OfflineService implements OnDestroy {
  private offlineSubscription: Subscription;

  constructor(private dialog: MatDialog) {
  }

  public init(): void {
    this.offlineSubscription = fromEvent(window, 'offline').subscribe(() => {
      this.dialog.closeAll();
      this.dialog.open(MessageDialogComponent, {
        maxWidth: '350px',
        panelClass: 'dialog-accent',
        data: {
          message: 'DIALOG.SYSTEM_OFFLINE',
          translateParams: {},
          actions: [MessageDialogActions.CLOSE]
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.offlineSubscription.unsubscribe();
  }
}
