import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() question: any;
  @Input() isTestFinised: boolean = false;
  @Input() isMultipleCorrectEnabled: boolean = false;

  @Output() nextQ = new EventEmitter();
  imgTxt: string = '';
  verifyAnswer: boolean = false;
  processed: any = {
    title: '',
    rasp: [],
  };
  userAnswers: Set<string> = new Set();

  constructor(private modalService: NgbModal) { }

  open(content: any, txt: string) {
    this.imgTxt = txt;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'xl',
        animation: true,
      })
      .result.then(
        (result) => {
          this.imgTxt = '';
        },
        (reason) => {
          this.imgTxt = '';
        }
      );
  }

  ngOnChanges(changes: any): void {
    if (changes.question && this.question) {
      this.userAnswers.clear();
      this.processed['title'] = this.question.q;
      this.processed['link'] = this.question?.link ?? null;
      if (this.isTestFinised) {
        this.verifyAnswer = true;
        this.userAnswers = new Set(this.question.answers);
        this.processed['ans'] = [
          ...this.question.right,
          ...this.question.wrong,
        ];
      } else {
        this.processed['ans'] = this.shuffle([
          ...this.question.right,
          ...this.question.wrong,
        ]);
      }
    }
  }

  shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  userSelection(value: string) {
    if (!this.verifyAnswer) {
      if (this.userAnswers.has(value)) {
        this.userAnswers.delete(value);
      } else {
        this.userAnswers.add(value);
      }
    }
  }

  next() {
    this.verifyAnswer = false;
    this.nextQ.emit({ ...this.question, userAnswers: Array.from(this.userAnswers) });
  }

  test(test: any[], ans: any) {
    return test.map((t: any) => t.ans).includes(ans.ans);
  }
}
