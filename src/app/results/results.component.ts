import { Component, Input, OnChanges, OnInit } from '@angular/core';
// import * as g from 'google';
declare const google: any;
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
@Input() answers:any;
public isCollapsedG = true;
public isCollapsedR = false;
  constructor() {}

  ngOnInit(): void {
    // this.grawChart();
  }
}
