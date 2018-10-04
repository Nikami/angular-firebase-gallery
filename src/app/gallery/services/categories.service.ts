import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DB, IFGalleryCategory, IFGalleryItem } from '../../shared/shared.models';
import { AngularFirestoreCollection } from 'angularfire2/firestore/collection/collection';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { first, map } from 'rxjs/operators';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { ImagesService } from './images.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Injectable()
export class CategoriesService {
  private categories: AngularFirestoreCollection<IFGalleryCategory>;

  constructor(private db: AngularFirestore,
              private images: ImagesService) {
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

  add(doc: IFGalleryCategory): Promise<void | DocumentReference> {
    return this.db.collection(DB.categories).add(doc)
      .catch(() => {
        console.error('trouble');
      });
  }

  remove(doc: IFGalleryCategory): Observable<any> {
    const ref = this.getCategoryRefById(doc.id);

    return this.images.getByCategoryRef(ref).pipe(
      first(),
      map((images: IFGalleryItem[]) => {
        const imagesObs = [];
        images.map((image: IFGalleryItem) => imagesObs.push(this.images.remove(image)));
        return combineLatest(imagesObs);
      }),
      map(() => this.db.collection(DB.categories).doc(doc.id).delete())
    );
  }

  getCategoryRefById(pushId: string): DocumentReference {
    return this.categories.doc(pushId).ref;
  }
}
