import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { SharedModule } from '../shared';
import { GalleryRouting } from './gallery.routing';
import { GalleryGuard } from './services/gallery.guard';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GalleryRouting
  ],
  declarations: [GalleryComponent],
  providers: [AuthService, GalleryGuard]
})
export class GalleryModule { }
