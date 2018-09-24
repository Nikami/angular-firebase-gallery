import { DocumentReference } from 'angularfire2/firestore';

export interface IUser {
  email: string;
  password: string;
}

export interface IFGalleryCategory {
  id: string;
  name: string;
}

export interface IFGalleryItem {
  id?: string;
  uid: string;
  category: DocumentReference;
  title: string;
  order: number;
  url: string;
}

export enum DB {
  images = 'images',
  categories = 'categories'
}
