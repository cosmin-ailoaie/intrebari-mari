import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'questions-mari';
  fileName: string = 'questions-mari';
  isTestFinished: boolean = false;
  doNotSave: boolean = false;
  progress: number = 0;
  maxPoints = 100;
  index: number = 1;
  isMultipleCorrectEnabled: boolean = false;
  questions: any;
  maxPointsByQ: number = 0;
  answers: Set<any> = new Set();
  answersArray: any[] = [];

  constructor() { }

  processedFile(suffled: any) {
    this.questions = suffled.suffledQuestions;
    this.fileName = suffled.fileName
  }

  next(rasp: any) {
    this.answers.add(rasp);

    if (this.index === this.questions.length) {
      this.isTestFinished = true;
      this.answersArray = Array.from(this.answers).sort((a, b) => a.id - b.id);
    }
    this.progress = (this.maxPoints / this.questions.length) * this.index;
    this.index = this.index + 1;
  }

  changeisMultipleCorrectEnabled() {
    this.isMultipleCorrectEnabled = !this.isMultipleCorrectEnabled;
  }

  showResults(event: any) {
    this.isTestFinished = true;
    this.fileName = event.name;
    this.answersArray = Array.from(event.answers).sort((a: any, b: any) => a.id - b.id);
    this.doNotSave = true;
  }

  reset() {
    window.location.reload();
  }
}
