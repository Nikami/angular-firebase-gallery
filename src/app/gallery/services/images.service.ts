import { Injectable } from '@angular/core';
import { DB, IFGalleryItem } from '../../shared/shared.models';
import { AngularFirestore, CollectionReference, DocumentReference } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { AngularFireStorage } from 'angularfire2/storage';
import { FIRE_STORAGE_PATH } from '../../app.config';
import { from } from 'rxjs/internal/observable/from';
import { merge } from 'rxjs/internal/observable/merge';

@Injectable()
export class ImagesService {

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) {
  }

  getByCategoryRef(categoryRef: DocumentReference): Observable<IFGalleryItem[]> {
    return this.db.collection(
      DB.images,
      (ref: CollectionReference) => ref
        .where('category', '==', categoryRef)
        .orderBy('order')).snapshotChanges().pipe(
        map((actions: DocumentChangeAction<IFGalleryItem>[]) => {
          return actions.map((a: DocumentChangeAction<IFGalleryItem>) => {
            const data: IFGalleryItem = a.payload.doc.data();
            const id: string = a.payload.doc.id;
            return { id, ...data };
          });
        }));
  }

  add(doc: IFGalleryItem): void {
    try {
      this.db.collection(DB.images).add(doc);
    } catch {
      console.error('trouble');
    }
  }

  rename(doc: IFGalleryItem, title): void {
    this.db.collection(DB.images).doc(doc.id).update({title: title});
  }

  remove(doc: IFGalleryItem): Observable<any> {
    return merge(
      from(this.db.collection(DB.images).doc(doc.id).delete()),
      this.storage.ref(FIRE_STORAGE_PATH).child(doc.uid).delete()
    );
  }

  changeImgOrder(doc: IFGalleryItem, order: number): void {
    this.db.collection(DB.images).doc(doc.id).update({order: order});
  }
}
