import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-intrebare',
  templateUrl: './intrebare.component.html',
  styleUrls: ['./intrebare.component.scss'],
})
export class IntrebareComponent implements OnChanges {
  @Input() intrebare: any;
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
    if (this.intrebare) {
      // this.checked.clear();
      this.processed['title'] = this.intrebare.q;
      if(this.output){
        this.check = true;
        this.checked = new Set(this.intrebare.raspunsuri)
        this.processed['rasp'] = [
          ...this.intrebare.corecte,
          ...this.intrebare.gresite,
        ];
      }else{
        this.processed['rasp'] = this.shuffle([
          ...this.intrebare.corecte,
          ...this.intrebare.gresite,
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
    this.nextQ.emit({...this.intrebare,raspunsuri:this.checked});
  }
}
