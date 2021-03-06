import { Injectable } from '@angular/core';
import { DB, IFGalleryItem } from '../../shared/shared.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { FIRE_STORAGE_PATH } from '../../app.config';
import { from } from 'rxjs/internal/observable/from';
import { merge } from 'rxjs/internal/observable/merge';
import { FirebaseApiService } from '../../core/services/firebase-api.service';
import {
  CollectionReference,
  DocumentChangeAction,
  DocumentReference
} from '@angular/fire/firestore';

@Injectable()
export class ImagesService {
  constructor(private fapi: FirebaseApiService) {}

  get(): Observable<IFGalleryItem[]> {
    return this.fapi
      .getCollection(DB.images)
      .snapshotChanges()
      .pipe(map(this.mapActions));
  }

  getByCategoryRef(
    categoryRef: DocumentReference
  ): Observable<IFGalleryItem[]> {
    return this.fapi
      .getCollection(DB.images, (ref: CollectionReference) =>
        ref.where('category', '==', categoryRef).orderBy('order')
      )
      .snapshotChanges()
      .pipe(map(this.mapActions));
  }

  add(doc: IFGalleryItem): void {
    this.fapi.addToCollection(DB.images, doc);
  }

  update(doc: IFGalleryItem, props: IFGalleryItem): void {
    this.fapi.updateCollection(DB.images, doc, props);
  }

  remove(doc: IFGalleryItem): Observable<any> {
    return merge(
      from(this.fapi.removeFromCollection(DB.images, doc)),
      this.fapi.removeFromStorage(FIRE_STORAGE_PATH, doc)
    );
  }

  private mapActions(
    actions: DocumentChangeAction<IFGalleryItem>[]
  ): IFGalleryItem[] {
    return actions.map((a: DocumentChangeAction<IFGalleryItem>) => {
      const data: IFGalleryItem = a.payload.doc.data();
      const id: string = a.payload.doc.id;
      return { id, ...data };
    });
  }
}
