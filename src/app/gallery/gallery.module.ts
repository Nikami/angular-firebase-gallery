import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../shared';
import { GalleryRouting } from './gallery.routing';
import { GalleryGuard } from './services/gallery.guard';
import { AuthService } from '../auth/services/auth.service';
import { GalleryService } from './services/gallery.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './services/categories.service';
import { UploadComponent } from './upload/upload.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GalleryRouting
  ],
  declarations: [GalleryComponent, CategoriesComponent, UploadComponent, NavigationComponent],
  providers: [AuthService, GalleryGuard, GalleryService, CategoriesService]
})
export class GalleryModule { }
