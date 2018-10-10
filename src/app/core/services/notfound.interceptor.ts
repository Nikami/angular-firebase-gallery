import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
  private readonly STATUS_NOT_FOUND: number = 404;

  constructor(private translateService: TranslateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const errorMessage = this.translateService.get('SYSTEM_IS_OFFLINE');

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (
          err instanceof HttpErrorResponse &&
          err.status === this.STATUS_NOT_FOUND
        ) {
          return throwError(errorMessage);
        } else {
          return throwError(err);
        }
      })
    );
  }
}
