import { provideRouter, RouterConfig } from '@angular/router';
import { FeatureComponent } from './+feature/';
import { HomeComponent } from './+home/';
import { WebBluetoothComponent } from './api/';

export const ROUTES: RouterConfig = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'feature', component: FeatureComponent, children: [
    { path: 'web-bluetooth', component: WebBluetoothComponent }
  ]}
];
