import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'api', children: [
    { path: 'web-bluetooth', loadChildren: 'app/api/web-bluetooth/web-bluetooth.module#WebBleModule' }
  ]}
];

export const ApiRoutesModule = RouterModule.forRoot(routes, {useHash: true, enableTracing: false});
