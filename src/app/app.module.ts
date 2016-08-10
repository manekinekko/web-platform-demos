// CORE DEPS
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// MATERIAL DESIGN MODULES
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdCardModule } from '@angular2-material/card';
import { MdListModule } from '@angular2-material/list';

export let MD_MODULES: any = [
  MdToolbarModule,
  MdInputModule,
  MdButtonModule,
  MdIconModule,
  MdCheckboxModule,
  MdCardModule,
  MdListModule
];

// ROUTES + APP
import { ROUTES } from './app.routes';
import { AppComponent }  from './app.component';
import { HomeComponent }  from './+home/';
import { FeatureComponent }  from './+feature/';
import { WebBluetoothComponent }  from './api/';

const appRoutingProviders: any[] = [];
const Routing = RouterModule.forRoot(ROUTES, {useHash: true});

@NgModule({
  imports: [
    BrowserModule,
    Routing,
    ReactiveFormsModule,
    ...MD_MODULES
  ],
  declarations: [
    WebBluetoothComponent,
    FeatureComponent,
    HomeComponent,
    AppComponent,
  ],
  providers: [ appRoutingProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
