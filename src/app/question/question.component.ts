import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() question: any;
  @Input() output: boolean = false;
  @Output() nextQ = new EventEmitter();

  check:boolean = false;
  processed: any = {
    title: '',
    rasp: [],
  };
  checked: Set<string> = new Set();

  constructor() {}

  ngOnChanges(): void {
    if (this.question) {
      this.checked.clear();
      this.processed['title'] = this.question.q;
      if(this.output){
        this.check = true;
        this.checked = new Set(this.question.answers)
        this.processed['ans'] = [
          ...this.question.right,
          ...this.question.wrong,
        ];
      }else{
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

  clicked(value: string) {
    if(!this.check){
      if (this.checked.has(value)) {
        this.checked.delete(value);
      } else {
        this.checked.add(value);
      }
    }
  }

  next() {
    this.check = false;
    this.nextQ.emit({...this.question,answers:this.checked});
  }
}
