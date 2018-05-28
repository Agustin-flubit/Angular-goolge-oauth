import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular5-social-login';

import { AuthGuard } from './auth/auth-guard.service';
import { ApiService } from './api/api.service';
import { AuthService } from './auth/auth.service';
import { NotificationsService } from './notifications/notifications.service';
import { UserService } from './user/user.service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { TitleResolver } from './resolvers/title-resolver';

import { environment } from '../../environments/environment';
import { AdminGuard } from './auth/admin-guard';
import { GoogleAuthService } from './auth/google-auth.service';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.google_auth_client_id)
        }
      ]
  );
  return config;
}
@NgModule({
  imports: [
    CommonModule,
    SocialLoginModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    AdminGuard,
    ApiService,
    AuthService,
    GoogleAuthService,
    NotificationsService,
    TitleResolver,
    UserService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded');
    }
  }
}
