import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { LoadingService, LoadingOverlayRef } from './loading.service';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService, private dataService :DataService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadingRef: LoadingOverlayRef;
    Promise.resolve(null).then(
      () => {
        loadingRef = this.loadingService.open()
      });

    return next.handle(req).do(event => {
      if (event instanceof HttpResponse && loadingRef) {
        loadingRef.close();
        this.dataService.changeMessage('Loading...');
      }
    }).catch(error => {
      if (loadingRef) {
        loadingRef.close();
      }
      return Observable.throwError(error);
    });
  }
}