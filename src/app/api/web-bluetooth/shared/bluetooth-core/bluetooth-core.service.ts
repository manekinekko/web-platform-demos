import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { BrowserWebBluetooth } from './platform';

import {
  RequestDeviceOptions,
  BluetoothRemoteGATTServer,
  BluetoothRemoteGATTService,
  BluetoothRemoteGATTCharacteristic,
  BluetoothGATTCharacteristic,
  BluetoothDevice,
  BluetoothServiceUUID,
  BluetoothCharacteristicUUID
}  from './types';

export * from './types';

const kBufferSize = 1;


@Injectable()
export class BluetoothCore extends ReplaySubject<any /* find a better interface type */> {

  private _device$: EventEmitter<BluetoothDevice>;
  private _gatt$: EventEmitter<BluetoothRemoteGATTServer>;
  private _characteristicValueChanges$: EventEmitter<number>;

  constructor(
    private _webBle: BrowserWebBluetooth
  ) {
    super(kBufferSize);

    this._device$ = new EventEmitter<BluetoothDevice>();
    this._gatt$ = new EventEmitter<BluetoothRemoteGATTServer>();
    this._characteristicValueChanges$ = new EventEmitter<number>();
  }

  /**
   * @return {Observable<BluetoothDevice>}
   */
  getDevice$(): Observable<BluetoothDevice> {
    return this._device$;
  }

  /**
   * @return {Observable<BluetoothRemoteGATTServer>}
   */
  getGATT$(): Observable<BluetoothRemoteGATTServer> {
    return this._gatt$;
  }

  /**
   * @return {Observable<number>}
   */
  streamValues$(): Observable<number> {
    return this._characteristicValueChanges$
      .distinctUntilChanged();
  }

  /**
   * Run the discovery process.
   *
   * @param  {RequestDeviceOptions} Options such as filters and optional services
   * @return {Promise<number>} Emites the value of the requested service read from the device
   */
  discover(options: RequestDeviceOptions) {
    console.log('Requesting devices with options %o', options);

    // @TODO should we return a singleton?
    // if (this._device) {
    //   return this._device
    // }

    return this._webBle.requestDevice(options)
      .then( (device: BluetoothDevice) => {

        // listen for disconnected devices
        (<any>device).addEventListener('gattserverdisconnected', this.onDeviceDisconnected.bind(this));

        this._device$.next(device);

        return device;
      });
  }

  /**
   * @param  {Event}  event [description]
   */
  onDeviceDisconnected(event: Event) {

    // @TODO never called (??)

    let disconnectedDevice: BluetoothDevice = <BluetoothDevice>(<any>event).target;
    console.log('disconnected device %o', disconnectedDevice);

    this._device$.next(null);

  }

  /**
   * Run the discovery process.
   *
   * @param  {RequestDeviceOptions} Options such as filters and optional services
   * @return {Observable<number>} Emites the value of the requested service read from the device
   */
  discover$(options: RequestDeviceOptions) {
    return this.toObservable(this.discover(options))
      .flatMap( (device: BluetoothDevice) => this.connectDevice$(device) );
  }

  /**
   * Connect to current device.
   *
   * @return {Promise<any>} Emites the gatt server instance of the requested device
   */
  connectDevice(device: BluetoothDevice) {
    console.log('Connecting to GATT Server of %o', device);

    return device.gatt.connect()
     .then( (gattServer: BluetoothRemoteGATTServer) => {

       this._gatt$.next(gattServer);

       return gattServer;
     });

  }

  /**
   * Connect to current device.
   *
   * @return {Observable<any>} Emites the gatt server instance of the requested device
   */
  connectDevice$(device?: BluetoothDevice) {
    return this.toObservable(this.connectDevice(device));
  }

  /**
   * @param  {BluetoothRemoteGATTServer}              gatt
   * @param  {BluetoothServiceUUID}                   service
   * @return {Observable<BluetoothRemoteGATTService>}
   */
  getPrimaryService$(gatt: BluetoothRemoteGATTServer, service: BluetoothServiceUUID): Observable<BluetoothRemoteGATTService> {
    console.log('Getting primary service %s of %o', service, gatt);
    return this.toObservable(gatt.getPrimaryService(service));
  }

  /**
   * @param  {BluetoothRemoteGATTService}                    primaryService
   * @param  {BluetoothCharacteristicUUID}                   characteristic
   * @return {Observable<BluetoothRemoteGATTCharacteristic>}
   */
  getCharacteristic$(primaryService: BluetoothRemoteGATTService, characteristic: BluetoothCharacteristicUUID): Observable<BluetoothRemoteGATTCharacteristic> {
    console.log('Getting Characteristic %s of %o', characteristic, primaryService);

    let characteristicPromise = primaryService.getCharacteristic(characteristic)
      .then( (char: BluetoothGATTCharacteristic) => {

        // listen for characteristic value changes
        (<any>char).addEventListener('characteristicvaluechanged', this.onCharacteristicChanged.bind(this));

        return char;
      })
      .then( (char: BluetoothGATTCharacteristic) => {

        char.startNotifications().then( _ =>  {
          return (<any>char).addEventListener('characteristicvaluechanged', this.onCharacteristicNotification.bind(this));
        });

        return char;

      });

    return this.toObservable(characteristicPromise);
  }


  /**
   * @param  {[type]} event [description]
   */
  onCharacteristicChanged(event) {
    let characteristicChanged: BluetoothGATTCharacteristic = <BluetoothGATTCharacteristic>(<any>event).target;

    characteristicChanged.readValue()
      .then( (value: DataView) => value.getUint8(0) )
      .then( (value: number) => {
        this._characteristicValueChanges$.next(value);
      });
  }

  /**
   * @param  {[type]} event [description]
   */
  onCharacteristicNotification(event) {
    var value = event.target.value;
    var textDecoder = new (<ExtendedWindow>window).TextDecoder(); // Used to convert bytes to UTF-8 string.
    console.log('Received ' + textDecoder.decode(value));
  }

  /**
   * @param  {BluetoothRemoteGATTCharacteristic} characteristic
   * @return {Observable<DataView>}
   */
  readValue$(characteristic: BluetoothRemoteGATTCharacteristic): Observable<DataView> {
    console.log('Reading Characteristic %o', characteristic);
    return this.toObservable(characteristic.readValue());
  }

  /**
   * A helper function that transforms any Promise into an Observable
   *
   * @param  {Promise<any>}    promise incoming promise
   * @return {Observable<any>}         outgoing observable
   */
  toObservable(promise: Promise<any>): Observable<any> {
    return Observable.fromPromise(promise)
  }

  /**
   * Sends random values (for testing purpose only).
   * @return {Observable<number>}
   */
  fakeNext(fakeValue: Function) {
    this._characteristicValueChanges$.next( fakeValue() );
  }

}
