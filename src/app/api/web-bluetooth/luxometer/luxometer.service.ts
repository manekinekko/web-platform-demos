import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  BluetoothCore,
  BluetoothRemoteGATTServer,
  BluetoothRemoteGATTService,
  BluetoothRemoteGATTCharacteristic,
  DataView,
  TiTag,
  TITAG_SERVICES
} from '../shared';

@Injectable()
export class LightService {

  static GATT_PRIMARY_SERVICE = TiTag.LIGHT.SERVICE;
  static GATT_CHARACTERISTIC_LIGHT_LEVEL = TiTag.LIGHT.DATA;

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

  getLightLevel(): Observable<number> {
   console.log('Getting Light Service...');

   return this._core

       .discover$({
         filters: [{
           name: 'CC2650 SensorTag'
         }],
         optionalServices: TITAG_SERVICES
       })
       .flatMap( (gatt: BluetoothRemoteGATTServer)  => this._core.getPrimaryService$(gatt, LightService.GATT_PRIMARY_SERVICE) )
       .flatMap( (primaryService: BluetoothRemoteGATTService) => this._core.getCharacteristic$(primaryService, LightService.GATT_CHARACTERISTIC_LIGHT_LEVEL) )
       .flatMap( (characteristic: BluetoothRemoteGATTCharacteristic) =>  this._core.readValue$(characteristic) )
       .map( (value: DataView) => value.getUint8(0) )

 }

}
