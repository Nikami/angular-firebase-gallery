import { Observable } from 'rxjs/internal/Observable';
import { IFGalleryItem } from '../../../shared/shared.models';
import { DocumentReference } from '@angular/fire/firestore';

export class UploadedFile {
  _uid: string;
  _title: string;
  _category: DocumentReference;
  _size: number;
  _url: string;
  _progess: Observable<number>;
  _isInProgress: boolean = true;
  _orderIdx: number;

  constructor(
    fUid: string,
    fTitle: string,
    fCategory: DocumentReference,
    fSize: number,
    fProgress: Observable<number>,
    orderIdx: number
  ) {
    this._uid = fUid;
    this._title = fTitle;
    this._category = fCategory;
    this._size = fSize;
    this._progess = fProgress;
    this._progess.subscribe((n: number) => {
      if (n === 100) {
        this._isInProgress = false;
      }
    });
    this._orderIdx = orderIdx;
  }

  get title(): string {
    return this._title;
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

  getItem(): IFGalleryItem {
    return {
      uid: this._uid,
      category: this._category,
      title: this._title,
      order: this._orderIdx,
      url: this._url
    };
  }
}
