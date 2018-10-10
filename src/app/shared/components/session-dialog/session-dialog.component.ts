import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { interval } from 'rxjs/internal/observable/interval';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import { ONE_SEC_MS } from '../../pipes/ms-to-time.pipe';

interface ISessionDialogData {
  ms: number;
}

@Component({
  selector: 'afg-session-dialog',
  templateUrl: './session-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionDialogComponent implements OnInit, OnDestroy {
  public time$: Subject<number> = new Subject();
  private timerSubscription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) private data: ISessionDialogData) {
  }

  ngOnInit(): void {
    this.subscribeToTimer();
  }

  subscribeToTimer(): void {
    this.timerSubscription = interval(ONE_SEC_MS)
      .pipe(
        take(this.data.ms / ONE_SEC_MS),
        map((count: number) => (this.data.ms - ONE_SEC_MS) - (count * ONE_SEC_MS))
      )
      .subscribe((ms: number) => {
        this.time$.next(ms);
      })
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}

