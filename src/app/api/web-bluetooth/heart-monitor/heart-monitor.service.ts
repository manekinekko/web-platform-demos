import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  BluetoothCore,
  BluetoothRemoteGATTServer,
  BluetoothRemoteGATTService,
  BluetoothRemoteGATTCharacteristic,
  DataView
} from '../shared';

@Injectable()
export class HeartMonitorService {

  static GATT_CHARACTERISTIC_HEART_RATE = 'heart_rate_measurement';
  static GATT_CHARACTERISTIC_BODY_SENSOR = 'body_sensor_location';
  static GATT_PRIMARY_SERVICE = 'heart_rate';

  constructor(
    private _core: BluetoothCore
  ) {
    console.log(this._core);
  }

  getFakeValue() {
    this._core.fakeNext(
      () => (Math.random()*110)|0
    )
  }

  getDevice() {
    return this._core.getDevice$();
  }

  streamValues() {
    return this._core.streamValues$();
  }

  /**
   * Get Battery Level GATT Characteristic value.
   * This logic is specific to this service, this is why we can't abstract it elsewhere.
   * The developer is free to provide any service, and characteristics she wants.
   *
   * @return {Observable<number>} Emites the value of the requested service read from the device
   */
   getHeartMonitorRate(): Observable<any> {
    console.log('Getting Heart Monitor Service...');

    return this._core

        .discover$({
          filters: [{
            services: [HeartMonitorService.GATT_PRIMARY_SERVICE]
          }]
        })

        .flatMap( (gatt: BluetoothRemoteGATTServer)  => this._core.getPrimaryService$(gatt, HeartMonitorService.GATT_PRIMARY_SERVICE) )
        .flatMap( (primaryService: BluetoothRemoteGATTService) => this._core.getCharacteristic$(primaryService, HeartMonitorService.GATT_CHARACTERISTIC_HEART_RATE) )
        // .flatMap( (characteristic: BluetoothRemoteGATTCharacteristic) =>  this._core.readValue$(characteristic) )
        // .map( (value: DataView, index: number) => value.getUint8(0) )

  }

}
