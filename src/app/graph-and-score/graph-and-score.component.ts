import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph-and-score',
  templateUrl: './graph-and-score.component.html',
  styleUrls: ['./graph-and-score.component.scss']
})
export class GraphAndScoreComponent implements AfterViewInit {
  @Input() answers: any[] = [];
  @Input() displayPercentage = true;
  score: number = 0;
  scorePercentage: number = 0;
  public chart: any;

  constructor() {
  }

  ngAfterViewInit() {
    if (this.answers.length) {
      this.score = this.answers.reduce((score, question) => {
        const value = +(this.calculateQuestionPoints(question)).toFixed(2);
        return score + value
      }, 0);
      this.chart = new Chart("chartCanvas", {
        type: 'line',
        data: {
          labels: this.answers.map((_, i) => `Question ${i + 1}`),
          datasets: [{
            label: 'Correct Answers',
            data: this.answers.map(question => question.userAnswers.filter((answer: any, index: number) => answer === question.right[index]).length),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 1,
            }
          }
        }
      });
    };
  }

  calculateQuestionPoints(question: any): number {
    if (question.userAnswers.length === question.right.length && question.userAnswers.sort().join(',') === question.right.sort().join(',')) {
      return 100 / this.answers.length;
    }

    const answered = question.userAnswers.filter((t: any) => t.ans[0] === '-');
    if (answered.length > 0) {
      return 0
    }

    return 100 / this.answers.length / 4;
  }
}
