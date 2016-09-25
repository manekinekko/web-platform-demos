import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import {
  BluetoothCore,
  BluetoothRemoteGATTServer,
  BluetoothRemoteGATTService,
  BluetoothRemoteGATTCharacteristic,
  DataView
} from '../shared';

@Injectable()
export class HeartMonitorService {

  static GATT_CHARACTERISCTICS = [
    'heart_rate_measurement',
    'body_sensor_location'
  ];
  static GATT_PRIMARY_SERVICE = 'heart_rate';

  constructor(
    private _core: BluetoothCore
  ) {
  }

  getFakeValue() {
    this._core.fakeNext();
  }

  getDevice() {
    return this._core.getDevice$();
  }

  streamValues() {
    return this._core.streamValues$()
      .map( (value: DataView) => value.getUint8(0) );
  }

  /**
   * Get Battery Level GATT Characteristic value.
   * This logic is specific to this service, this is why we can't abstract it elsewhere.
   * The developer is free to provide any service, and characteristics she wants.
   *
   * @return {Observable<number>} Emites the value of the requested service read from the device
   */
   getHeartMonitorRate(): Observable<any> {
    console.log('Getting Heart Monitor Service: %s', HeartMonitorService.GATT_CHARACTERISCTICS[0]);

    return this._setupGATTConnection(HeartMonitorService.GATT_CHARACTERISCTICS[0])
        .mergeMap( (characteristic: BluetoothRemoteGATTCharacteristic) =>  this._core.readValue$(characteristic) )
        .map( (value: DataView, index: number) => value.getUint8(0) )

  }

   getBodySensorLocation(): Observable<any> {
    console.log('Getting Heart Monitor Service: %s', HeartMonitorService.GATT_CHARACTERISCTICS[1]);

    return this._setupGATTConnection(HeartMonitorService.GATT_CHARACTERISCTICS[1])
        .mergeMap( (characteristic: BluetoothRemoteGATTCharacteristic) =>  this._core.readValue$(characteristic) )
        .map( (value: DataView, index: number) => {
          let sensorLocation = value.getUint8(0);
          let location = 'Unknown';
          switch (sensorLocation) {
            case 0: return 'Other';
            case 1: return 'Chest';
            case 2: return 'Wrist';
            case 3: return 'Finger';
            case 4: return 'Hand';
            case 5: return 'Ear Lobe';
            case 6: return 'Foot';
            default: return 'Unknown';
          }
        });

  }

  private _setupGATTConnection(characteristic): Observable<any> {
   return this._core
       .discover$({
         optionalServices: [HeartMonitorService.GATT_PRIMARY_SERVICE]
       })
       .mergeMap( (gatt: BluetoothRemoteGATTServer)  => this._core.getPrimaryService$(gatt, HeartMonitorService.GATT_PRIMARY_SERVICE) )
       .mergeMap( (primaryService: BluetoothRemoteGATTService) => this._core.getCharacteristic$(primaryService, characteristic) );
 }

}
