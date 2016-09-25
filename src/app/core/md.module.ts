import { NgModule } from '@angular/core';
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

// For AOT!!
export function mapProviders(m) {
  return m.forRoot();
}

@NgModule({
  imports: [
    ...MD_MODULES.map(mapProviders)
  ],
  exports: [
    ...MD_MODULES
  ]
})
export class MdModule { }
