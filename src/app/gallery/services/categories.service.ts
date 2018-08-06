import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DB, IFGalleryCategory } from '../../shared/shared.models';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class CategoriesService {
  private categories: AngularFirestoreCollection<IFGalleryCategory>;

  constructor(private db: AngularFirestore) {
    this.categories = db.collection(DB.categories);
  }

  get(): Observable<IFGalleryCategory[]> {
    return this.categories.valueChanges();
  }
}
