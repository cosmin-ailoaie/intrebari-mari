import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @Output() testIt = new EventEmitter();
  @Output() resultsPlease = new EventEmitter();

  processedFile: any[] = [];
  done: boolean = false;
  uploaded: boolean = false;
  error: boolean = false;
  hasLocalStorage: boolean = false;
  selectedFilename: string = '';
  localFinished: any;
  nrOfQ: any;
  locals: any;

  constructor() { }

  ngOnInit(): void {
    this.checkHistory();
  }

  checkHistory() {
    const localHistoryJSON: string = localStorage.getItem('history') ?? "[]";
    const localFinishedJSON: string = localStorage.getItem('saveFinishedTests') ?? "{}";
    if (localHistoryJSON?.length) {
      this.localFinished = JSON.parse(localFinishedJSON);
    }
    if (localHistoryJSON?.length) {
      this.locals = JSON.parse(localHistoryJSON);
      if (this.locals.length) {
        this.hasLocalStorage = true;
      } else {
        this.hasLocalStorage = false;
        this.locals = [];
      }
    } else {
      this.hasLocalStorage = false;
      this.locals = [];
    }
  }

  handleHistoryInput(name: string, questions: any[]) {
    this.uploaded = true;
    this.selectedFilename = name

    this.processTheFileArray(questions, true);
  }

  handleShowResults(name: string, answers: any) {
    this.resultsPlease.emit({ name, answers });
  }

  handleFileInput(files: any) {
    this.uploaded = true;
    const theFile = files.target?.files[0];
    this.selectedFilename = theFile.name;
    const toTest = new FileReader();
    toTest.readAsText(theFile);
    toTest.onload = () => {
      const result = toTest.result?.toString();
      if (result) {
        const processing = result.split('\r\n\r\n').filter((p) => p.trim());
        this.processTheFileArray(processing);
        if (!this.error) {
          const history = [
            ...(this.locals ?? []),
            {
              name: theFile.name,
              file: this.processedFile,
              size: theFile.size,
              nrOfQ: this.nrOfQ,
            },
          ];
          localStorage.setItem('history', JSON.stringify(history));
        }
      }
    };
  }

  processTheFileArray(processing: any, history: boolean = false) {
    this.processedFile = processing.map((q: any, index: number) => {
      let list = null;
      if (history) {
        return q;
      } else {
        list = q.split('\r\n');

        const right = list.filter((q: string) => q[0] === '=');
        const wrong = list.filter((q: string) => q[0] === '-');
        const question = list[0].split('!!');
        return {
          id: index,
          q: question[0],
          link: this.handleLink(question[1]),
          right: right.map((q: string) => {
            const s = q.split('!!');
            return { ans: s[0], link: this.handleLink(s[1]) };
          }),
          wrong: wrong.map((q: string) => {
            const s = q.split('!!');
            return { ans: s[0], link: this.handleLink(s[1]) };
          }),
        };
      }
    });
    if (this.testFile()) {
      this.nrOfQ = this.processedFile.length;
      this.done = true;
    } else {
      this.error = true;
    }
  }

  test() {
    this.testIt.emit({ suffledQuestions: this.shuffle([...this.processedFile]), fileName: this.selectedFilename });
  }

  clearHistory() {
    localStorage.clear();
    this.checkHistory();
    window.location.reload();
  }
  handleLink(q: any) {
    if (q === undefined || q === null) {
      return undefined;
    }
    if (q.indexOf('http') === 0) {
      return q;
    }
    return undefined;
  }
  testFile(): boolean {
    let isValid = true;

    this.processedFile.some((q: any) => {
      if (q.q.length === 0 && (q.right.length || q.wrong.length)) {
        isValid = false;
      }
    });

    return isValid;
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
}
