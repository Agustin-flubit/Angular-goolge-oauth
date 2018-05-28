import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GoogleAuthService } from './auth.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';


import * as fromUsers from '../../user/store';
import * as userActions from '../../user/store/actions/users-actions';

import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Notification } from 'rxjs/Notification';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
        private store: Store<fromUsers.UsersState>,
        private router: Router, private userService: UserService,
        private notificationsService: NotificationsService
    ) {
  }

  hasUserInStore(id: number) {
    return this.store.select(fromUsers.getUsersEntities)
      .map(entities => !!entities[id])
      .take(1);
  }

  isUserOwned(id: number) {
    return this.store.select(fromUsers.getUsersEntities)
    .map(entities => entities[id].own === true)
    .take(1);
  }

  userFromApi(id: number): Observable<boolean> {
    return this.userService.loadOne(id)
        .map((userEntity: User) => {
            if (!userEntity.own) {
                this.sendNotificationNotAuothorised();
                this.router.navigate(['']);
            }
            return userEntity.own;
        })
  }

  hasUser(id: number): Observable <boolean> {
    return this.hasUserInStore(id)
        .switchMap( inStore => {
            if (inStore) {
                return this.isUserOwned(id)
                    .do(owned => {
                        if (!owned) {
                            this.sendNotificationNotAuothorised();
                            this.router.navigate(['']);
                        }
                    });
            }

            return this.userFromApi(id);
        })
  }

  sendNotificationNotAuothorised() {
    this.notificationsService.open('Administrator not authorised for this operation.');
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasUser(+route.params['userId'])
  }
}
