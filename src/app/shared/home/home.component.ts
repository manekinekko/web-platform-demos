import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  features = [{
    'enable': true,
    'logo': 'assets/images/ble.png',
    'url': 'https://webbluetoothcg.github.io/web-bluetooth/',
    'slug': 'web-bluetooth',
    'name': 'Web Bluetooth',
    'description': 'Bluetooth is a standard for short-range wireless communication between devices. Bluetooth 4.0 introduced a new "Low Energy" mode known as "Bluetooth Smart", BLE, or just LE...'
  }, {
    'enable': false,
    'logo': 'assets/images/chrome.png',
    'url': 'https://www.w3.org/Payments/',
    'slug': 'web-payment',
    'name': 'Web Payment',
    'description': 'The purpose of the Web Payments Community Group is to discuss, research, prototype, and create working systems that enable Universal Payment for the Web...'
  }, {
    'enable': false,
    'logo': 'assets/images/chrome.png',
    'url': 'https://w3c.github.io/webappsec-credential-management/',
    'slug': 'credential-management',
    'name': 'Credential Management',
    'description': 'A standards-track proposal at the W3C that gives developers programmatic access to a browser’s credential manager and helps users sign in more easily...'
  }];

  constructor() { }

  ngOnInit() {
  }

}
