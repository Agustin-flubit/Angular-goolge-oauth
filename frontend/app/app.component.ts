import { Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { SocialUser } from 'angular5-social-login';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './store';
import { AuthService } from './core/auth/auth.service';
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
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) {
    this.authService.init();
  }

  ngOnInit() {
    this.currentPageTitle$ = this.store.select(fromRoot.getCurrentTitle);
    this.user$ = this.authService.getCurrentUser();
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
  }
}
