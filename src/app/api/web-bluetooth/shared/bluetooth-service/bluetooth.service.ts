import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/fromPromise';

const kBufferSize = 1;

@Injectable()
export class BluetoothService extends ReplaySubject<any /* find a better interface type */> {

  /**
   * An internal property of type <ExtendedNavigator>
   * @see src/typings.d.ts (L8)
   * @type {ExtendedNavigator}
   */
  private _navigator: ExtendedNavigator;

  constructor() {
    super(kBufferSize);

    this._navigator = <ExtendedNavigator>navigator;
  }

  /**
   * Run the discovery process.
   *
   * @param  {any}    filters The services
   * @return {Observable<number>} Emites the value of the requested service read from the device
   */
  discover(filters: any) {

    // @TODO may be we should break down these calls into a separate API.

    this._navigator.bluetooth.requestDevice(filters)
      .then(device => {
        this._log('Connecting to GATT Server...');
        return device.gatt.connect();
      })
      .then(server => {
        this._log('Getting Battery Service...');
        return server.getPrimaryService('battery_service');
      })
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
        this.next(batteryLevel);
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
