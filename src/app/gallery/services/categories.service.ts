import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  DB,
  IFGalleryCategory,
  IFGalleryItem
} from '../../shared/shared.models';
import { first, map } from 'rxjs/operators';
import { ImagesService } from './images.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { FirebaseApiService } from '../../core/services/firebase-api.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference
} from '@angular/fire/firestore';

@Injectable()
export class CategoriesService {
  private categories: AngularFirestoreCollection<IFGalleryCategory>;

  constructor(
    private db: AngularFirestore,
    private images: ImagesService,
    private fapi: FirebaseApiService
  ) {
    this.categories = this.fapi.getCollection(DB.categories);
  }

  // TODO: mb should refactor this later
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

  add(doc: IFGalleryCategory): Observable<DocumentReference> {
    return this.fapi.addToCollection(DB.categories, doc);
  }

  remove(doc: IFGalleryCategory): Observable<any> {
    const ref = this.getCategoryRefById(doc.id);

    return this.images.getByCategoryRef(ref).pipe(
      first(),
      map((images: IFGalleryItem[]) => {
        const imagesObs = [];
        images.map((image: IFGalleryItem) =>
          imagesObs.push(this.images.remove(image))
        );
        return combineLatest(imagesObs);
      }),
      map(() => this.fapi.removeFromCollection(DB.categories, doc))
    );
  }

  update(doc: IFGalleryCategory, props: IFGalleryCategory): void {
    this.fapi.updateCollection(DB.categories, doc, props);
  }

  getCategoryRefById(pushId: string): DocumentReference {
    return this.fapi.getDocRefByPushId(DB.categories, pushId);
  }
}
