export interface IUser {
  email: string;
  password: string;
}

export interface IFGalleryCategory {
  id: string;
  name: string;
}

export interface IFGalleryItem {
  category: string;
  name: string;
  order: number;
  url: string;
}

export enum DB {
  images = 'images',
  categories = 'categories'
}
