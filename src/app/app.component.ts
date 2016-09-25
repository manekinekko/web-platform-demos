import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <md-toolbar class="bg__pink">
    <a [routerLink]="['home']">
      <img class="rotate" src="assets/images/chrome.png" width="40" height="40"/></a>
      &nbsp;&nbsp;&nbsp;Web Platform Awesome Demos
  </md-toolbar>
  <section>
    <router-outlet></router-outlet>
  </section>
`
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
