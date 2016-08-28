import { Component, OnInit, NgZone } from '@angular/core';
import { BatteryLevelService } from './battery-level.service';

@Component({
  moduleId: module.id,
  selector: 'app-battery-level',
  templateUrl: 'battery-level.component.html',
  styleUrls: ['battery-level.component.css'],
  providers: [ BatteryLevelService ]
})
export class BatteryLevelComponent implements OnInit {

    batteryLevel: string = 'N/A';
    device: any = {};

    constructor(
      private _zone: NgZone,
      private _batteryLevelService: BatteryLevelService
    ) {}

    ngOnInit() {
      this.getDeviceStatus();
      this.enableNotification();
    }

    enableNotification() {
      this._batteryLevelService.getNotification().subscribe(this.showBatteryLevel.bind(this));
    }

    getDeviceStatus() {
      this._batteryLevelService.getDevice().subscribe(
        (device) => {

          if(device) {
            this.device = device
          }
          else {
            // device not connected or disconnected
            this.device = null;
            this.batteryLevel = 'N/A';
          }
        }
      );
    }

    getFakeValue() {
      this._batteryLevelService.getFakeValue();
    }

    getBatteryLevel() {
      return this._batteryLevelService.getBatteryLevel().subscribe(this.showBatteryLevel.bind(this));
    }

    showBatteryLevel(value: number) {

      // force change detection
      this._zone.run( () =>  {
        console.log('Reading battery level %d', value);
        this.batteryLevel = ''+value;
      })
    }

  }
