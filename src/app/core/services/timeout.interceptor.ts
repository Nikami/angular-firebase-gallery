import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  private readonly REQUEST_TIMEOUT: number = 5000;

  constructor(private translateService: TranslateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const errorMessage = this.translateService.get('SYSTEM_IS_OFFLINE');

    return next.handle(req).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          return throwError(errorMessage);
        } else {
          return throwError(err);
        }
      })
    );
  }
}
