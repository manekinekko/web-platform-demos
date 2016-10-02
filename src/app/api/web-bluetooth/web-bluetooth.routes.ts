import { RouterModule, Routes } from '@angular/router';

import { WebBluetoothComponent } from './web-bluetooth.component';

export const routes: Routes = [
  { path: '', component: WebBluetoothComponent }
];

export const WebBleRoutesModule = RouterModule.forChild(routes);
