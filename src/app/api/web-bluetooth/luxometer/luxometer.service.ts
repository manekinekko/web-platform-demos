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

        // @TODO add auto-enable config, to enable a sensor, for instance (see below)
        //  enable: [{
        //    characteristic: TiTag.LIGHT.CONFIGURATION,
        //    value: new Uint8Array([1])
        //  }]

       })
       .flatMap( (gatt: BluetoothRemoteGATTServer)  => {

         // enable sensor in order to collect data
         let primaryService = this._core.getPrimaryService$(gatt, TiTag.LIGHT.SERVICE);

         primaryService
          .flatMap( (primaryService) => this._core.getCharacteristic$(primaryService, TiTag.LIGHT.CONFIGURATION))
          .subscribe( (characteristic: BluetoothRemoteGATTCharacteristic) => this._core.writeValue$(characteristic, new Uint8Array([1])) );

          return primaryService;
       })

       .flatMap( (primaryService: BluetoothRemoteGATTService) => this._core.getCharacteristic$(primaryService, TiTag.LIGHT.DATA) )

       // @TODO we should provide those helper methods in core:
       // - readValue_8$(): number
       // - readValue_16$(): number
       // - readValue_32$(): number
       // - readValue_64$(): number
       .flatMap( (characteristic: BluetoothRemoteGATTCharacteristic) =>  this._core.readValue$(characteristic) )

       .map( (value: DataView) => value.getUint8(0) )

 }

}
