import { Component, OnInit, NgZone } from '@angular/core';
import { HeartMonitorService } from './heart-monitor.service';
import { BluetoothCore } from '../shared/';

@Component({
  selector: 'app-heart-monitor',
  templateUrl: 'heart-monitor.component.html',
  styleUrls: ['heart-monitor.component.css'],
  providers: [ HeartMonitorService, BluetoothCore ]
})
export class HeartMonitorComponent implements OnInit {

  heartRate: string = '--';
  bodySensor: string = '--';
  device: any = {};

  constructor(
    private _zone: NgZone,
    private _heartMonitorService: HeartMonitorService
  ) { }

  ngOnInit() {
    this.getDeviceStatus();
    this.streamValues();
  }

  streamValues() {
    this._heartMonitorService.streamValues().subscribe(this.showHeartRates.bind(this));
  }

  getDeviceStatus() {
    this._heartMonitorService.getDevice().subscribe(
      (device) => {

        if(device) {
          this.device = device
        }
        else {
          // device not connected or disconnected
          this.device = null;
          this.heartRate = '--';
        }
      }
    );
  }

  getFakeValue() {
    this._heartMonitorService.getFakeValue();
  }

  getBodySensorLocation() {
    return this._heartMonitorService.getBodySensorLocation()
      .subscribe(
        (value) => this.bodySensor = value,
        (error) => console.error('[HearRate::Error]', error)
      );
  }

  getHeartRate() {
    return this._heartMonitorService.getHeartMonitorRate()
      .subscribe(
        (value) => this.heartRate = value,
        (error) => console.error('[HearRate::Error]', error)
      );
  }

  showHeartRates(value: number) {
    // force change detection
    this._zone.run( () =>  {
      console.log('Reading heart rate level %d', value);
      this.heartRate = ''+value;
    });
  }

}
