import { Component, OnInit } from '@angular/core';
import { TemperatureService } from './temperature.service';
import { BluetoothCore } from '../shared/';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
  providers: [ TemperatureService, BluetoothCore ]
})
export class TemperatureComponent implements OnInit {

  value: string|number = '--';
  device: any = {};

  constructor(
    private _service: TemperatureService
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
