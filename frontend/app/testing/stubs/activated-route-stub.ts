export { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ActivatedRouteStub {

  // ActivatedRoute.params and ActivatedRoute.queryParams is Observable
  private subject = new BehaviorSubject({});
  private querySubject = new BehaviorSubject({});
  params = this.subject.asObservable();
  queryParams = this.subject.asObservable();
  data = this.subject.asObservable();

  // Test parameters
  private _testParams = {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // Test query parameters
  private _testQueryParams = {};
  get testQueryParams() { return this._testQueryParams; }
  set testQueryParams(params: {}) {
    this._testQueryParams = params;
    this.querySubject.next(params);
  }

  set testData (data: any) {
    this.subject.next(data);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return {
      params: this.testParams,
      queryParams: this.testQueryParams
    };
  }
}
