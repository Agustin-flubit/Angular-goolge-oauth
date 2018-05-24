import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angular5-social-login';

import { environment } from '../../environments/environment';
import { GoogleAuthService } from './auth/auth.service';
import { NotificationsService } from './notifications/notifications.service';

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
    GoogleAuthService,
    NotificationsService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
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
