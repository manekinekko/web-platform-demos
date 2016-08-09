import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule } from '@angular2-material/button';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';
import { MdCardModule } from '@angular2-material/card';
import { MdInputModule } from '@angular2-material/input';

import { AppComponent }  from './app.component';
import { HomeComponent }  from './home';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];
const appRoutingProviders: any[] = [];
const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [
    BrowserModule,
    // Router
    routing,
    // Forms
    FormsModule,
    // Material Design
    MdButtonModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule
  ],
  declarations: [ HomeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ appRoutingProviders ]
})
export class AppModule { }
