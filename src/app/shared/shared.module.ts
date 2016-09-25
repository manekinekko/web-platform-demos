import { NgModule } from '@angular/core';
import { RouterModule, provideRoutes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedRoutesModule }  from './shared.routes';
import { HomeComponent }  from './home/';
import { ApiCardComponent }  from './api-card/';

import { CoreModule } from '../core/';

@NgModule({
  imports: [
    CoreModule,
    SharedRoutesModule
  ],
  declarations: [
    HomeComponent,
    ApiCardComponent
  ],
  exports: [
    ApiCardComponent
  ]
})
export class SharedModule { }
