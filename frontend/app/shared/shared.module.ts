import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    HeaderComponent,
    UsersListComponent
  ],
})
export class SharedModule { }
