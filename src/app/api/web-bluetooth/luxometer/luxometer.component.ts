import { Component, OnInit } from '@angular/core';
import { LightService } from './luxometer.service';
import { BluetoothCore } from '../shared/';

@Component({
  selector: 'app-luxometer',
  templateUrl: 'luxometer.component.html',
  styleUrls: ['luxometer.component.css'],
  providers: [ LightService, BluetoothCore ]
})
export class LuxometerComponent implements OnInit {

  value: string|number = '--';
  device: any = {};

  constructor(
    private _service: LightService
  ) { }

  ngOnInit() {
    this.getDeviceStatus();
    this.streamValues();
  }

  streamValues() {
    this._service.streamValues()
      .subscribe(
        (value: number) => this.value = value,
        (error) => console.error(error)
      );
  }

  getDeviceStatus() {
    this._service.getDevice().subscribe(
      (device) => {

        if(device) {
          this.device = device
        }
        else {
          // device not connected or disconnected
          this.device = null;
          this.value = '--';
        }
      }
    );
  }

  getValue() {
    return this._service.getValue().subscribe(
      (value: number) => this.value = value,
      (error) => console.error(error)
    );
  }

  getFakeValue() {
    this._service.getFakeValue();
  }


}
