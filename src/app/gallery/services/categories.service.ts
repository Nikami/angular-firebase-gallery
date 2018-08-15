import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DB, IFGalleryCategory } from '../../shared/shared.models';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';

@Injectable()
export class CategoriesService {
  private categories: AngularFirestoreCollection<IFGalleryCategory>;

  constructor(private db: AngularFirestore) {
    this.categories = db.collection(DB.categories);
  }

  get(): Observable<IFGalleryCategory[]> {
    return this.categories.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<IFGalleryCategory>[]) => {
        return actions.map((a: DocumentChangeAction<IFGalleryCategory>) => {
          const data: IFGalleryCategory = a.payload.doc.data();
          const id: string = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCategoryRefById(pushId: string): DocumentReference {
    return this.categories.doc(pushId).ref;
  }
}
