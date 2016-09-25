import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'api-card',
  templateUrl: 'api-card.component.html',
  styleUrls: ['api-card.component.css']
})
export class ApiCardComponent implements OnInit {

  @Input('logo') src;
  @Input('theme') class;
  @Input('device') device;

  constructor() { }

  ngOnInit() {
  }

}
