import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() answers: any[] = [];
  @Input() fileName: string = '';
  @Input() doNotSave: boolean = false;

  public isCollapsedG = true;
  public isCollapsedR = false;
  constructor() { }

  ngOnInit(): void {
    const savedFinishedTestsJSON: any = localStorage.getItem('saveFinishedTests');

    if (!this.doNotSave) {
      if (savedFinishedTestsJSON) {
        const savedTests = JSON.parse(savedFinishedTestsJSON);
        if (Array.isArray(savedTests[this.fileName])) {
          savedTests[this.fileName] = [...savedTests[this.fileName]];
        } else {
          savedTests[this.fileName] = [];
        }
        savedTests[this.fileName].push({ date: new Date(), answers: this.answers });
        localStorage.setItem('saveFinishedTests', JSON.stringify(savedTests))
      } else {
        localStorage.setItem('saveFinishedTests', JSON.stringify({ [this.fileName]: [{ date: new Date(), answers: this.answers }] }))
      }
    }
  }
}
