import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from '../core/auth/auth-guard.service';
import { UsersIndexComponent } from './users-index/users-index.component';
import { TitleResolver } from '../core/resolvers/title-resolver';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouterModule {  }
