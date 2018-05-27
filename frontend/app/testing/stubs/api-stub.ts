import { Response, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class ApiStub {

  private _response: any;
  private subject = new BehaviorSubject(this.testResponse);
  response = this.subject.asObservable();

  get testResponse() { return this._response; }
  set testResponse(response: any) {
    this._response = response;
    this.subject.next(response);
  }

  get(path: string , params?: HttpParams) {
    return this.response;
  }

  post(path: string , body?: any | undefined , params?: HttpParams) {
    return this.response;
  }

  put(path: string , body?: any | undefined, params?: HttpParams) {
    return this.response;
  }

  patch(path: string , body?: any | undefined, params?: HttpParams) {
    return this.response;
  }

  delete(path: string, body?: any | undefined) {
    return this.response;
  }
}
