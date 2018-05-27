import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from '../notifications/notifications.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient

  ) {
    this.baseUrl = environment.apiBase;
  }

  get(path: string , params?: HttpParams): Observable<any> {
    return this.request('get', path, undefined, params);
  }

  post(path: string , body?: any | undefined , params?: HttpParams): Observable<any> {
    return this.request('post', path, body, params);
  }

  put(path: string , body?: any | undefined, params?: HttpParams): Observable<any> {
    return this.request('put', path, body, params);
  }

  patch(path: string , body?: any | undefined, params?: HttpParams): Observable<any> {
    return this.request('patch', path, body, params);
  }

  delete(path: string, body?: any | undefined): Observable<any> {
    return this.request('delete', path, body);
  }

  private request(method: string, path: string , body?: any, params?: HttpParams): Observable<any> {
    const paramsString = params ? params.toString() : '';

    const options = this.createRequestOptions(body, params);
    return this.httpClient.request<any>(method, `${this.baseUrl}${path}`, options);
  }

  private createRequestOptions(body?: any | undefined, params?: HttpParams) {
    const options = {
      headers: new HttpHeaders(),
      params: params || null,
      body
    };
    options.headers.append('Content-Type', 'application/json');
    return options;
  }
}
