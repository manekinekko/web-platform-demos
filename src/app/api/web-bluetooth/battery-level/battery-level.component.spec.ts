/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { BatteryLevelComponent } from './battery-level.component';

describe('Component: BatteryLevel', () => {
  it('should create an instance', () => {
    let component = new BatteryLevelComponent();
    expect(component).toBeTruthy();
  });
});
