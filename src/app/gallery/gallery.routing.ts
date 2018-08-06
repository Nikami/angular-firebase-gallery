import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { GalleryGuard } from './services/gallery.guard';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [GalleryGuard],
    children: [
      {
        path: 'categories',
        component: CategoriesComponent
      }
    ]
  }
];

export const GalleryRouting = RouterModule.forChild(routes);
