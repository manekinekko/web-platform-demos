import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { WebPlatformDemosAppComponent } from '../app/web-platform-demos.component';

beforeEachProviders(() => [WebPlatformDemosAppComponent]);

describe('App: WebPlatformDemos', () => {
  it('should create the app',
      inject([WebPlatformDemosAppComponent], (app: WebPlatformDemosAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'web-platform-demos works!\'',
      inject([WebPlatformDemosAppComponent], (app: WebPlatformDemosAppComponent) => {
    expect(app.title).toEqual('web-platform-demos works!');
  }));
});
