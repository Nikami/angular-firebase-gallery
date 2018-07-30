import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, filter, distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable()
export class StorageService {
  private prefix: string = 'afg';

  private state: BehaviorSubject<Object> = new BehaviorSubject({});

  constructor() {}

  public get<T>(key: string): Observable<T> {
    return this.state.pipe(
      tap((state: Object) => {
        if (!state[key]) {
          const fullKey = `${this.prefix}.${key}`;
          const value: string = window.localStorage.getItem(fullKey);

          state[key] = value;
        }
      }),
      map((state: Object) => {
        return state[key];
      }),
      filter((prop: T) => {
        // this filters out all non-meaningful values
        // tweak if subscribers need them as well
        return prop !== undefined && prop !== null;
      }),
      distinctUntilChanged()
    );
  }

  public set<T>(key: string, value: T): void {
    const fullKey = `${this.prefix}.${key}`;

    window.localStorage.setItem(fullKey, value.toString());

    this.state.next(Object.assign({}, this.getState(), { [key]: value }));
  }

  public clear(): void {
    window.localStorage.clear();

    this.state.next({});
  }

  private getState(): Object {
    return this.state.getValue();
  }
}
