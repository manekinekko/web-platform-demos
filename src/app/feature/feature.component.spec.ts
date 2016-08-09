/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { FeatureComponent } from './feature.component';

describe('Component: Feature', () => {
  it('should create an instance', () => {
    let component = new FeatureComponent();
    expect(component).toBeTruthy();
  });
});
