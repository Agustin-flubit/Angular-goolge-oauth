import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './signin.component';
import { SignInRouterModule } from './signin.routes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignInRouterModule
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }
