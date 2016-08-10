import { provideRouter, RouterConfig } from '@angular/router';
import { FeatureComponent } from './+feature/';
import { HomeComponent } from './+home/';

export const ROUTES: RouterConfig = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'feature/:slug', component: FeatureComponent },
];
