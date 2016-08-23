import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/fromPromise';

const kBufferSize = 1;


export interface RequestDeviceOptions {
  filters: Array<any>;
  optionalServices?: Array<any>;
}

@Injectable()
export class BluetoothCore extends ReplaySubject<any /* find a better interface type */> {

  /**
   * An internal property of type <ExtendedNavigator>
   * @see src/typings.d.ts (L8)
   * @type {ExtendedNavigator}
   */
  private _navigator: ExtendedNavigator;

  private _device: any;

  constructor() {
    super(kBufferSize);

    this._navigator = <ExtendedNavigator>navigator;
    this._device = null;
  }

  /**
   * Run the discovery process.
   *
   * @param  {RequestDeviceOptions} Options such as filters and optional services
   * @return {Observable<number>} Emites the value of the requested service read from the device
   */
  discover(options: RequestDeviceOptions) {

    if (this._device) {
      this.next({type: 'BluetoothDevice', value: this._device});
      return;
    }

    this._navigator.bluetooth.requestDevice(options)
      .then(device => {
        this._device = device;
        this.next({type: 'BluetoothDevice', value: this._device});
      });

   }

  /**
   * Connect to current device.
   *
   * @return {Observable<any>} Emites the gatt server instance of the requested device
   */
   connectDevice() {

     this._log('Connecting to GATT Server...');
     return this._device.gatt.connect()
       .then(gattServer => {
         this.next({type: 'BluetoothRemoteGATTServer', value: gattServer});
       });

   }

  /**
   * Get Battery Level GATT Characteristic value.
   *
   * @return {Observable<number>} Emites the value of the requested service read from the device
   */
   getBatteryLevel() {

     // @TODO may be we should break down these calls into a separate API.

     this._log('Getting Battery Service...');
     return this._device.gatt.getPrimaryService('battery_service')
      .then(service => {
        this._log('Getting Battery Level Characteristic...');
        return service.getCharacteristic('battery_level');
      })
      .then(characteristic => {
        this._log('Reading Battery Level...');
        return characteristic.readValue();
      })
      .then(value => {
        let batteryLevel = value.getUint8(0);
        this._log('> Battery Level is ' + batteryLevel + '%');
        this.next({type: 'Number', value: batteryLevel});
      })
      .catch(error => {
        this._log('Argh! ' + error);
      });

  }

  /**
   * Sends random values (for testing purpose only).
   * @return {Observable<number>}
   */
  simulateNotify() {
    this.next( (Math.random()*110)|0 );
  }


  /**
   * A helper method which contains all logs that are displayed in the view
   * @param  {string} message The message to be printed in the view
   */
  private _log(message: string) {
    console.log(message);
  }

}
