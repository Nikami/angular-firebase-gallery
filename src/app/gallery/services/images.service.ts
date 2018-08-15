import { Injectable } from '@angular/core';
import { DB, IFGalleryItem } from '../../shared/shared.models';
import { AngularFirestore, CollectionReference, DocumentReference } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';

@Injectable()
export class ImagesService {

  constructor(private db: AngularFirestore) {
  }

  getByCategoryRef(categoryRef: DocumentReference): Observable<IFGalleryItem[]> {
    return this.db.collection(
      DB.images,
      (ref: CollectionReference) => ref.where('category', '==', categoryRef))
      .snapshotChanges().pipe(
        map((actions: DocumentChangeAction<IFGalleryItem>[]) => {
          return actions.map((a: DocumentChangeAction<IFGalleryItem>) => {
            const data: IFGalleryItem = a.payload.doc.data();
            const id: string = a.payload.doc.id;
            return { id, ...data };
          });
        }));
  }
}
