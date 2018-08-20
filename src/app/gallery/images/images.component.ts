import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { IFGalleryItem } from '../../shared/shared.models';
import { DocumentReference } from 'angularfire2/firestore';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material';
import { UploadComponent } from '../upload/upload.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'afg-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  private imagesSubscription: Subscription;
  private categoryId: string;
  public categoryName: string;
  public categoryRef: DocumentReference;
  public editMode: boolean = false;

  imgs: IFGalleryItem[] = [];

  constructor(private route: ActivatedRoute,
              private categories: CategoriesService,
              private images: ImagesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.queryParamMap.get('id');
    this.categoryName = this.route.snapshot.queryParamMap.get('name');
    this.categoryRef = this.categories.getCategoryRefById(this.categoryId);

    this.subscribeToImages();
  }

  subscribeToImages(): void {
    this.imagesSubscription = this.images.getByCategoryRef(this.categoryRef).subscribe((images: IFGalleryItem[]) => {
      this.imgs = images;
    });
  }

  openUploadDialog(): void {
    this.dialog.open(UploadComponent, {
      width: '80%',
      data: {
        category: this.categoryRef
      }
    });
  }

  removeImage(img: IFGalleryItem): void {
    this.images.remove(img);
  }

  editTitle(img: IFGalleryItem, title: string): void {
    this.images.rename(img, title);
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
  }
}
