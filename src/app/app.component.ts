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
  raspunsuri: Set<any> = new Set();
  processedFile(listOfQ: any) {
    // console.log($file);
    this.intrebari = listOfQ;
  }

  next(rasp:any) {
    this.raspunsuri.add(rasp);
    if (this.index === this.intrebari.length) {
      this.finish = true;
      this.raspunsuri = new Set(Array.from(this.raspunsuri).sort((a,b) => a.id - b.id));
    }
    this.progress = (this.maxPoints / this.intrebari.length) * this.index;
    this.index = this.index + 1;
  }

  reset(){
    window.location.reload();
  }
}
