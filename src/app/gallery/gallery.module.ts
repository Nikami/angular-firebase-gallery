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
import { ImagesComponent } from './images/images.component';
import { ImagesService } from './services/images.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { MoveImageComponent } from './move-image/move-image.component';

@NgModule({
  imports: [
    GalleryRouting,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    GalleryComponent,
    CategoriesComponent,
    NavigationComponent,
    ImagesComponent,
    UploadComponent,
    AddCategoryComponent,
    ImageDialogComponent,
    MoveImageComponent
  ],
  entryComponents: [UploadComponent, AddCategoryComponent, ImageDialogComponent, MoveImageComponent],
  providers: [AuthService, GalleryGuard, GalleryService, CategoriesService, ImagesService]
})
export class GalleryModule { }
