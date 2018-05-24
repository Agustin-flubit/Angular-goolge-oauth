import { Component, ViewChild, OnInit} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { SocialUser } from 'angular5-social-login';
import { Observable } from 'rxjs/Observable';

import { GoogleAuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<SocialUser>;

  constructor(private googleAuthService: GoogleAuthService) {}

  ngOnInit() {
    this.user$ = this.googleAuthService.getCurrentUser();
    this.isAuthenticated$ = this.googleAuthService.isAuthenticated$;
  }

  logout() {
    this.googleAuthService.logout();
  }

}
