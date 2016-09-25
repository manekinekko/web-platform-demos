import { NgModule } from '@angular/core';

import { WebBleModule }  from './web-bluetooth/';
import { ApiRoutesModule }  from './api.routes';

@NgModule({
  imports: [
    WebBleModule,
    ApiRoutesModule
  ],
  exports: [
    WebBleModule
  ]
})
export class ApiModule { }
