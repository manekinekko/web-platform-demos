import { NgModule } from '@angular/core';

import { CoreModule }  from './core/';
import { SharedModule }  from './shared/';
import { ApiModule }  from './api/';

import { AppComponent }  from './app.component';
import { AppRoutesModule }  from './app.routes';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    ApiModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
