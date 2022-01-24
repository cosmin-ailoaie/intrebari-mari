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
  @Output() nextQ = new EventEmitter();
  checked: Set<string> = new Set();
  processed: any = {
    title: '',
    rasp: [],
  };
  constructor() {}

  ngOnChanges(): void {
    if (this.intrebare) {
      this.processed['title'] = this.intrebare.q;
      this.processed['rasp'] = this.shuffle([
        ...this.intrebare.corecte,
        ...this.intrebare.gresite,
      ]).map((rasp: string) => rasp.substring(1));
      console.log(this.processed);
    }
  }
  shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  clicked(value: string) {
    if (this.checked.has(value)) {
      this.checked.delete(value);
    } else {
      this.checked.add(value);
    }
  }
  next() {
    this.nextQ.emit();
  }
}
