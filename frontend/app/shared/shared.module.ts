import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsCardComponent } from './components/user-details-card/user-details-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    UsersListComponent,
    UserDetailsCardComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponent,
    UsersListComponent,
    UserDetailsCardComponent,
    UserFormComponent
  ],
})
export class SharedModule { }
