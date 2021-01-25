import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public myBaseUrl: string;
  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${path}`,
      body
    ).pipe(
      // retry(3),
      catchError(this.formatErrors)
    );
  }

  get(path: string, body: Object = {}): Observable<any> {
    return this.http.get(
      `${path}`,
      body
    ).pipe(
      catchError(this.formatErrors)
    );
  }
}