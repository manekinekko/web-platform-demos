import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebBluetoothComponent }  from './web-bluetooth.component';
import { BatteryLevelComponent } from './battery-level/';
import { HeartMonitorComponent } from './heart-monitor/';
import { LuxometerComponent } from './luxometer/';
import { UnitPipe, BluetoothCore } from './shared';

import { SharedModule } from '../../shared/';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    WebBluetoothComponent,
    BatteryLevelComponent,
    HeartMonitorComponent,
    LuxometerComponent,
    UnitPipe
  ],
  providers: [
    BluetoothCore
  ]
})
export class WebBleModule { }
