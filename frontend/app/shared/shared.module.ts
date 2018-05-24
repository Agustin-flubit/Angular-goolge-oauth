import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HttpClientModule
  ],
  declarations: []
})
export class SharedModule { }
