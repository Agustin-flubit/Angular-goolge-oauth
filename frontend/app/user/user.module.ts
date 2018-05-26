import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserComponent } from './user.component';
import { UserRouterModule } from './user.routes.module';
import { UsersIndexComponent } from './users-index/users-index.component';
import * as fromUsers from './store';
import { SharedModule } from '../shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersEffects } from './store/effects/users-effects';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [
    CommonModule,
    UserRouterModule,
    SharedModule,
    StoreModule.forFeature('users', fromUsers.reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    EffectsModule.forFeature([UsersEffects]),
  ],
  declarations: [
    UserComponent,
    UsersIndexComponent,
    UserDetailsComponent,
    UserNewComponent,
    UserEditComponent
  ]
})
export class UserModule { }
