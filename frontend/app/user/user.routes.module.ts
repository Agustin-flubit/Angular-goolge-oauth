import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../core/auth/auth-guard.service';
import { UsersIndexComponent } from './users-index/users-index.component';
import { TitleResolver } from '../core/resolvers/title-resolver';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UsersIndexComponent,
        pathMatch: 'full',
        data: {title: 'Users Index'},
        resolve: {title: TitleResolver}
      },
      {
        path: 'new',
        component: UserNewComponent,
        pathMatch: 'full',
        data: {title: 'New User'},
        resolve: {title: TitleResolver}
      },
      {
        path: ':userId',
        component: UserDetailsComponent,
        pathMatch: 'full',
        data: {title: 'User Details'},
        resolve: {title: TitleResolver}
      },
      {
        path: ':userId/edit',
        component: UserEditComponent,
        pathMatch: 'full',
        data: {title: 'User Details'},
        resolve: {title: TitleResolver}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {  }
