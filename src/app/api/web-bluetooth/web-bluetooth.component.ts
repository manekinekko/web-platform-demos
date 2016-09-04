import { Component, OnInit } from '@angular/core';
import { BatteryLevelComponent } from './battery-level/';
import { HeartMonitorComponent } from './heart-monitor/';
import { LuxometerComponent } from './luxometer/';

@Component({
  moduleId: module.id,
  selector: 'app-web-bluetooth',
  templateUrl: 'web-bluetooth.component.html',
  styleUrls: ['web-bluetooth.component.css'],
  directives: [
    BatteryLevelComponent,
    HeartMonitorComponent,
    LuxometerComponent
 ]
})
export class WebBluetoothComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
