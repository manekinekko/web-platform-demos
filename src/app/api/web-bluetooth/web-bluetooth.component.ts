import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-web-bluetooth',
  templateUrl: 'web-bluetooth.component.html',
  styleUrls: ['web-bluetooth.component.css']
})
export class WebBluetoothComponent implements OnInit {

  /**
   * An internal property of type <ExtendedNavigator>
   * @see src/typings.d.ts (L8)
   * @type {ExtendedNavigator}
   */
  private _navigator: ExtendedNavigator;

  private _logs: string[] = [];

  constructor() {
    this._navigator = <ExtendedNavigator>navigator;
  }

  /**
   * Angular lifecycle hook: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html#!#directives-and-components
   */
  ngOnInit() {
  }

  /**
   * Launch the browser chooser dialog
   */
  chooser() {

    /**
     * @todo abstract away this boilerplate into a nice and comprehensive
     * angular2 service
     */
    this._navigator.bluetooth.requestDevice({

      filters: [{
        services: ['battery_service']
      }]

    }).then(device => {
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
    })
    .catch(error => {
      this._log('Argh! ' + error);
    });
  }

  /**
   * A helper method which contains all logs that are displayed in the view
   * @param  {string} message The message to be printed in the view
   */
  private _log(message: string) {
    this._logs.push(message);
  }

}
