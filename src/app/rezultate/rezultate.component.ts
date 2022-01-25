import { Component, Input, OnChanges, OnInit } from '@angular/core';
// import * as g from 'google';
declare const google: any;
@Component({
  selector: 'app-rezultate',
  templateUrl: './rezultate.component.html',
  styleUrls: ['./rezultate.component.scss'],
})
export class RezultateComponent implements OnInit {
@Input() raspunsuri:any;
public isCollapsedG = true;
public isCollapsedR = false;
  constructor() {}

  ngOnInit(): void {
    // this.grawChart();
  }
}
