import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Spinner {
  public isSpinning$: Subject<boolean> = new Subject();

  run(): void {
    this.isSpinning$.next(true);
  }

  stop(): void {
    this.isSpinning$.next(false);
  }
}

@Injectable()
export class SpinnerService {
  private global: Spinner = new Spinner();

  constructor() {}

  getGlobal(): Spinner {
    return this.global;
  }

  create(): Spinner {
    return new Spinner();
  }
}
