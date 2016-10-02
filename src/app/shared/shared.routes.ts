import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/';

export const routes: Routes = [
  { path: 'home', component: HomeComponent }
];

export const SharedRoutesModule = RouterModule.forChild(routes);
