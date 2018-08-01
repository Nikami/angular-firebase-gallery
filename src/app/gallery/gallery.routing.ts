import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryGuard } from './services/gallery.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'gallery'
  },
  {
    path: 'gallery',
    pathMatch: 'full',
    component: GalleryComponent,
    canActivate: [GalleryGuard]
  }
];

export const GalleryRouting = RouterModule.forChild(routes);
