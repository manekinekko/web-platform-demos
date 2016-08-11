/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { BluetoothService } from './bluetooth.service';

describe('Service: Bluetooth', () => {
  beforeEach(() => {
    addProviders([BluetoothService]);
  });

  it('should ...',
    inject([BluetoothService],
      (service: BluetoothService) => {
        expect(service).toBeTruthy();
      }));
});
