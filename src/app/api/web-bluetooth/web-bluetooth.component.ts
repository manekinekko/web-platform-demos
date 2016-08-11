import { Component, OnInit } from '@angular/core';
import { BatteryLevelComponent } from './battery-level/';
import { HeartMonitorComponent } from './heart-monitor/';

@Component({
  moduleId: module.id,
  selector: 'app-web-bluetooth',
  templateUrl: 'web-bluetooth.component.html',
  styleUrls: ['web-bluetooth.component.css'],
  directives: [
    BatteryLevelComponent,
    HeartMonitorComponent
 ]
})
export class WebBluetoothComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
