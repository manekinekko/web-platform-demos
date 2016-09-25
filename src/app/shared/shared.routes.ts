import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/';

export const routes: Routes = [
  { path: '**', redirectTo: '/home' },
  { path: 'home', component: HomeComponent }
];

export const SharedRoutesModule = RouterModule.forRoot(routes, {
  useHash: true,
  enableTracing: true
});
