import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from '../services/loading.service';
import {inject, Injectable} from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loader = inject(LoadingService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
    return next.handle(req).pipe(finalize(() => this.loader.hide()));
  }
}
