import { Component, OnInit } from '@angular/core';
import { BluetoothCore } from '../shared/';

@Component({
  moduleId: module.id,
  selector: 'app-heart-monitor',
  templateUrl: 'heart-monitor.component.html',
  styleUrls: ['heart-monitor.component.css'],
  providers: [ BluetoothCore ]
})
export class HeartMonitorComponent implements OnInit {

  constructor(
    private _ble: BluetoothCore
  ) { }

  ngOnInit() {

    this._ble.subscribe(

      (value) => {
        console.log(value);
      },
      (error) => console.error(error),
      () => console.log('done')

    );

  }

  simulateNotify() {}

  chooser() {
    this._ble.discover({

      filters: [{
        services: ['heart_rate']
      }]

    });
  }

}
