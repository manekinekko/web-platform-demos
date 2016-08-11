/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { HeartMonitorComponent } from './heart-monitor.component';

describe('Component: HeartMonitor', () => {
  it('should create an instance', () => {
    let component = new HeartMonitorComponent();
    expect(component).toBeTruthy();
  });
});
