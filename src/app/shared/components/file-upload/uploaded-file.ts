import { Observable } from 'rxjs/internal/Observable';

export class UploadedFile {
  _name: string;
  _size: number;
  _url: string;
  _progess: Observable<number>;

  constructor(fName: string,
              fSize: number,
              fUrl: string,
              fProgress: Observable<number>) {
    this._name = fName;
    this._size = fSize;
    this._url = fUrl;
    this._progess = fProgress;
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

  get progress(): Observable<number> {
    return this._progess;
  }
}
