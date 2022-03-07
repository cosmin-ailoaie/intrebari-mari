import { ServiceService } from './service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'questions-mari';
  finish: boolean = false;
  progress: number = 0;
  maxPoints = 100;
  index: number = 1;
  crazy: boolean = false;
  questions: any;
  maxPointsByQ: number = 0;
  answers: Set<any> = new Set();
  constructor(private serviceService: ServiceService) {}
  processedFile(listOfQ: any) {
    this.questions = listOfQ;
  }

  next(rasp: any) {
    this.answers.add(rasp);
    if (this.index === this.questions.length) {
      this.finish = true;
      this.answers = new Set(
        Array.from(this.answers).sort((a, b) => a.id - b.id)
      );
    }
    this.progress = (this.maxPoints / this.questions.length) * this.index;
    this.index = this.index + 1;
  }
  changeCrazy() {
    this.crazy = !this.crazy;
  }
  reset() {
    window.location.reload();
  }
  testVlad() {
    this.serviceService.test().subscribe((t) => {
      console.log(t);
    });
  }
}
