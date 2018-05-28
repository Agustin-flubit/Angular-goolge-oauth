import { Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { SocialUser } from 'angular5-social-login';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './store';
import { GoogleAuthService } from './core/auth/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentPageTitle$: Observable<string>;
  user$: Observable<SocialUser>;

  constructor(
    private googleAuthService: GoogleAuthService,
    private store: Store<fromRoot.State>
  ) {
    this.googleAuthService.init();
  }

  ngOnInit() {
    this.currentPageTitle$ = this.store.select(fromRoot.getCurrentTitle);
    this.user$ = this.googleAuthService.getCurrentUser();
    this.isAuthenticated$ = this.googleAuthService.isAuthenticated$;
  }

  logout() {
    this.googleAuthService.logout();
  }

}
