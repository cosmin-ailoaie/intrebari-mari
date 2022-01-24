import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'intrebari-mari';
  finish: boolean = false;
  progress: number = 0;
  maxPoints = 100;
  index: number = 1;
  intrebari: any;
  maxPointsByQ: number = 0;
  processedFile(listOfQ: any) {
    // console.log($file);
    this.intrebari = listOfQ;
  }

  next() {
    if (this.index === this.intrebari.length) {
      this.finish = true;
    }
    this.progress = (this.maxPoints / this.intrebari.length) * this.index;
    this.index = this.index + 1;
    // console.log(this.intrebari[this.index]);
  }
}
