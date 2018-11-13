import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { GalleryGuard } from './services/gallery.guard';
import { CategoriesComponent } from './categories/categories.component';
import { ROUTES } from '../app.config';
import { ImagesComponent } from './images/images.component';

export const GALLERY_ROUTES: Routes = [
  {
    path: ROUTES.GALLERY,
    component: GalleryComponent,
    canActivate: [GalleryGuard],
    children: [
      {
        path: ROUTES.CATEGORIES,
        component: CategoriesComponent
      },
      {
        path: ROUTES.IMAGES,
        component: ImagesComponent
      }
    ]
  }
];

export const GalleryRouting = RouterModule.forChild(GALLERY_ROUTES);
