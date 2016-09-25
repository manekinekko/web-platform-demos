// CORE DEPS
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRoutes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { MdModule } from './md.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    MdModule
  ],
  exports: [
    BrowserModule,
    RouterModule,
    MdModule
  ]
})
export class CoreModule { }
