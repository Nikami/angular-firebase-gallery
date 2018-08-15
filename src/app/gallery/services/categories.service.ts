import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DB, IFGalleryCategory } from '../../shared/shared.models';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoriesService {
  private categories: AngularFirestoreCollection<IFGalleryCategory>;

  constructor(private db: AngularFirestore) {
    this.categories = db.collection(DB.categories);
  }

  get(): Observable<IFGalleryCategory[]> {
    return this.categories.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IFGalleryCategory;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getCategoryRefById(pushId: string): DocumentReference {
    return this.categories.doc(pushId).ref;
  }
}
