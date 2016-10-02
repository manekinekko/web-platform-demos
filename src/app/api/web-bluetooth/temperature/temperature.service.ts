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
export class TemperatureService {

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
      .map( this.mappedValue.bind(this) );
  }

  getValue(): Observable<number> {
    console.log('Getting Temperature Service...');

    return this._core

       .discover$({
         filters: [{
           name: 'CC2650 SensorTag'
         }],
         optionalServices: TITAG_SERVICES
       })
       .flatMap( (gatt: BluetoothRemoteGATTServer)  => {

         // enable sensor in order to collect data
         let primaryService = this._core.getPrimaryService$(gatt, TiTag.HUMIDITY.SERVICE);

         primaryService
          .flatMap( (primaryService) => this._core.getCharacteristic$(primaryService, TiTag.HUMIDITY.CONFIGURATION))
          .subscribe( (characteristic: BluetoothRemoteGATTCharacteristic) => this._core.writeValue$(characteristic, new Uint8Array([1])) );

          return primaryService;
       })

       .flatMap( (primaryService: BluetoothRemoteGATTService) => this._core.getCharacteristic$(primaryService, TiTag.HUMIDITY.DATA) )

       .flatMap( (characteristic: BluetoothRemoteGATTCharacteristic) =>  this._core.readValue$(characteristic) )

       .map( this.mappedValue.bind(this) )

  }

  mappedValue(data: DataView): number {
    let value = (this._core.littleEndianToUint16(data, 0) / 65536.0) * 165 - 40;
    return +value.toFixed(2);
  }

}
