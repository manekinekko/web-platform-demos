import { Component, OnInit } from '@angular/core';
import { BluetoothService } from '../shared/';

@Component({
  moduleId: module.id,
  selector: 'app-battery-level',
  templateUrl: 'battery-level.component.html',
  styleUrls: ['battery-level.component.css'],
  providers: [ BluetoothService ]
})
export class BatteryLevelComponent implements OnInit {

    /**
     * This value contains the level of the device's battery. It is used in the view. It
     * @type {string}
     */
    betteryLevel: string = 'N/A';

    /**
     * This value contains the Css class representing the state of the battery level.
     * This value is used in the view.
     * @type {string}
     */
    cssClass: string = 'level-unknown';

    constructor(
      private _ble: BluetoothService
    ) {}

    ngOnInit() {

      /**
       * Subscribe to the bluetooth service in order to receive the response
       */
      this._ble.subscribe(

        (value) => {
          this.betteryLevel = `${value} %`;
          this.cssClass = this._mapBatteryLevelToCssClass(value);
        },
        (error) => console.error(error),
        () => console.log('done')

      );
    }

    simulateNotify() {
      this._ble.simulateNotify();
    }

    /**
     * Launch the browser chooser dialog. You should have subscribed to this service
     * in order to be notified about the response.
     */
    chooser() {
      this._ble.discover({

        filters: [{
          services: ['battery_service']
        }]

      });
    }

    /**
     * This functions maps the battery level to a fixed Css classe
     * @param  {number} batteryLevel Battery level
     * @return {string}              The Css class.
     *                                   One of:
     *                                   'level-critical', 'level-unknown',
     *                                   'level-20', 'level-30', 'level-50',
     *                                   'level-60', 'level-80', 'level-90',
     *                                   'level-100'
     */
    private _mapBatteryLevelToCssClass(batteryLevel: number): string {
      if( batteryLevel < 10 ) {
        return 'level-critical';
      }
      else if ( batteryLevel >= 10 && batteryLevel < 30) {
        return 'level-20';
      }
      else if ( batteryLevel >= 30 && batteryLevel < 50) {
        return 'level-30';
      }
      else if ( batteryLevel >= 50 && batteryLevel < 60) {
        return 'level-50';
      }
      else if ( batteryLevel >= 60 && batteryLevel < 80) {
        return 'level-60';
      }
      else if ( batteryLevel >= 80 && batteryLevel < 90) {
        return 'level-80';
      }
      else if ( batteryLevel >= 90  && batteryLevel < 100) {
        return 'level-90';
      }
      else if ( batteryLevel >= 100) {
        return 'level-100';
      }
      else {
        return 'level-unknown';
      }
    }

  }
