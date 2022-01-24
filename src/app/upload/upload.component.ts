import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  processedFile: any[] = [];
  done: boolean = false;
  uploaded: boolean = false;
  error: boolean = false;
  nrOfQ: any;
  @Output() testIt = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  handleFileInput(files: any) {
    this.uploaded = true;
    const theFile = files.target?.files[0];
    const toTest = new FileReader();
    toTest.readAsText(theFile);
    toTest.onload = () => {
      const result = toTest.result?.toString();
      if (result) {
        const processing = result.split('\r\n\r\n').filter((p) => p.trim());
        this.processedFile = processing.map((q: any) => {
          const list = q.split('\r\n');
          const corecte = list.filter((q: string) => q[0] === '=');
          const gresite = list.filter((q: string) => q[0] === '-');
          return {
            q: list[0],
            corecte,
            gresite,
          };
        });
        if (this.testFile()) {
          this.nrOfQ = this.processedFile.length;
          this.done = true;
        } else {
          this.error = true;
        }
      }
    };
  }
  test() {
    this.testIt.emit(this.shuffle([...this.processedFile]));
  }
  testFile(): boolean {
    let isValid = true;
    this.processedFile.some((q: any) => {
      if (q.q.length === 0 || q.corecte.length === 0) {
        isValid = false;
      }
    });
    return isValid;
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
}
