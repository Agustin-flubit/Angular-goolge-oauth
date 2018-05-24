import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutesModule } from './app.routes.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutesModule,
    UserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
