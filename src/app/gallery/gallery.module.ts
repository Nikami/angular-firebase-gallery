import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../shared';
import { GalleryRouting } from './gallery.routing';
import { GalleryGuard } from './services/gallery.guard';
import { AuthService } from '../auth/services/auth.service';
import { GalleryService } from './services/gallery.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './services/categories.service';
import { UploadComponent } from './images/upload/upload.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ImagesComponent } from './images/images.component';
import { ImagesService } from './services/images.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ImageComponent } from './images/image/image.component';
import { MoveImageComponent } from './images/move-image/move-image.component';
import { RenameCategoryComponent } from './categories/rename-category/rename-category.component';

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
    ImageComponent,
    MoveImageComponent,
    RenameCategoryComponent
  ],
  entryComponents: [
    UploadComponent,
    AddCategoryComponent,
    ImageComponent,
    MoveImageComponent,
    RenameCategoryComponent
  ],
  providers: [AuthService, GalleryGuard, GalleryService, CategoriesService, ImagesService]
})
export class GalleryModule { }
