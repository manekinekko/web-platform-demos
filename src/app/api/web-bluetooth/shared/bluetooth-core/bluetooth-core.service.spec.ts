/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { BluetoothCore } from './bluetooth-core.service';

describe('Service: Bluetooth Core', () => {
  beforeEach(() => {
    addProviders([BluetoothCore]);
  });

  it('should ...',
    inject([BluetoothCore],
      (service: BluetoothCore) => {
        expect(service).toBeTruthy();
      }));
});
