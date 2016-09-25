import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'prefix' }
];

export const AppRoutesModule = RouterModule.forRoot(routes, {useHash: true, enableTracing: true});
