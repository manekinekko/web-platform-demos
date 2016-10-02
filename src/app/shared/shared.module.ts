import { NgModule } from '@angular/core';
import { RouterModule, provideRoutes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedRoutesModule }  from './shared.routes';
import { HomeComponent }  from './home/';
import { TimeseriesChartComponent } from './timeseries-chart/';
import { ApiCardComponent }  from './api-card/';

import { MdModule }  from '../core/';

@NgModule({
  imports: [
    MdModule,
    CommonModule,
    SharedRoutesModule
  ],
  declarations: [
    TimeseriesChartComponent,
    HomeComponent,
    ApiCardComponent
  ],
  exports: [
    MdModule,
    CommonModule,
    TimeseriesChartComponent,
    ApiCardComponent
  ]
})
export class SharedModule { }
