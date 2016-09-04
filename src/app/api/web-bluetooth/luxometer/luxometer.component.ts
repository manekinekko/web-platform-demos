import { Component, OnInit } from '@angular/core';
import { LightService } from './luxometer.service';
import { BluetoothCore } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-luxometer',
  templateUrl: 'luxometer.component.html',
  styleUrls: ['luxometer.component.css'],
  providers: [ LightService, BluetoothCore ]
})
export class LuxometerComponent implements OnInit {

  light: string|number = 'N/A';
  heartRate: string = 'N/A';
  bodySensor: string = 'N/A';
  device: any = {};

  constructor(
    private _lightService: LightService
  ) { }

  ngOnInit() {
    this.getDeviceStatus();
    this.streamValues();
  }

  streamValues() {
    this._lightService.streamValues()
      .subscribe(
        (value) => this.light = value
      );
  }

  getDeviceStatus() {
    this._lightService.getDevice().subscribe(
      (device) => {

        if(device) {
          this.device = device
        }
        else {
          // device not connected or disconnected
          this.device = null;
          this.light = 'N/A';
        }
      }
    );
  }

  getLightLevel() {
    return this._lightService.getLightLevel().subscribe(
      value => this.light = value
    );
  }

  getFakeValue() {
    this._lightService.getFakeValue();
  }


}
