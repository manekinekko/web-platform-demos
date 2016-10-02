import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule }  from './core/';
import { SharedModule }  from './shared/';
import { ApiModule }  from './api/';

import { AppComponent }  from './app.component';
import { AppRoutesModule }  from './app.routes';

@NgModule({
  imports: [
    CoreModule,
    BrowserModule,
    SharedModule,
    ApiModule,
    AppRoutesModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
