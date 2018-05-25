import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import * as fromRoot from '../../store';
import * as layoutActions from '../../store/actions/layout-actions';
import {Store} from '@ngrx/store';

@Injectable()
export class TitleResolver implements Resolve<string> {
  constructor(private store: Store<fromRoot.State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    this.store.dispatch(new layoutActions.SetCurrentTitle(route.data['title']));
    return Observable.of(route.data['title']);
  }
}
