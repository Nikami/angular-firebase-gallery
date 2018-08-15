import { Observable } from 'rxjs/internal/Observable';

export class UploadedFile {
  _name: string;
  _size: number;
  _url: string;
  _progess: Observable<number>;
  _isInProgress: boolean = true;

  constructor(fName: string,
              fSize: number,
              fProgress: Observable<number>) {
    this._name = fName;
    this._size = fSize;
    this._progess = fProgress;
    this._progess.subscribe((n: number) => {
      if (n === 100) {
        this._isInProgress = false;
      }
    });
  }

  get name(): string {
    return this._name;
  }

  get size(): number {
    return this._size;
  }

  get url(): string {
    return this._url;
  }

  set url(path: string) {
    this._url = path;
  }

  get progress(): Observable<number> {
    return this._progess;
  }

  get isInProgress(): boolean {
    return this._isInProgress;
  }
}
