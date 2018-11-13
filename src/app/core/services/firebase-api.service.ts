import { Injectable } from '@angular/core';
import { DB } from '../../shared/shared.models';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs/internal/Observable';
import { FIRE_STORAGE_PATH } from '../../app.config';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryFn
} from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

@Injectable()
export class FirebaseApiService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getCollection(
    collection: DB,
    query?: QueryFn
  ): AngularFirestoreCollection<any> {
    return this.db.collection(collection, query);
  }

  getDocRefByPushId(collection: DB, id: string): DocumentReference {
    return this.getCollection(collection).doc(id).ref;
  }

  addToCollection(collection: DB, doc: any): Observable<DocumentReference> {
    return fromPromise(this.getCollection(collection).add(doc));
  }

  removeFromCollection(collection: DB, doc: any): Observable<void> {
    return fromPromise(
      this.getCollection(collection)
        .doc(doc.id)
        .delete()
    );
  }

  updateCollection(collection: DB, doc: any, data: any): Observable<void> {
    return fromPromise(
      this.getCollection(collection)
        .doc(doc.id)
        .update(data)
    );
  }

  getStorageRef(path: string): AngularFireStorageReference {
    return this.storage.ref(path);
  }

  uploadToStorage(path: string, file: File): AngularFireUploadTask {
    return this.storage.upload(path, file);
  }

  removeFromStorage(path: string, doc: any): Observable<any> {
    return this.storage
      .ref(FIRE_STORAGE_PATH)
      .child(doc.uid)
      .delete();
  }
}
