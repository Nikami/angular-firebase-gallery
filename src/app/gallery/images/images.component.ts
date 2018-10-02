import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { IFGalleryItem } from '../../shared/shared.models';
import { DocumentReference } from 'angularfire2/firestore';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material';
import { UploadComponent } from '../upload/upload.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDragAndDropOptions } from '../../shared/directives/drag-and-drop.directive';

@Component({
  selector: 'afg-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit, OnDestroy {
  private imagesSubscription: Subscription;
  private categoryId: string;
  private lastImgIdx: number;

  public categoryName: string;
  public categoryRef: DocumentReference;
  public editMode: boolean = false;
  public imgs: IFGalleryItem[] = [];
  public isDragging: boolean = false;

  constructor(private route: ActivatedRoute,
              private categories: CategoriesService,
              private images: ImagesService,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.queryParamMap.get('id');
    this.categoryName = this.route.snapshot.queryParamMap.get('name');
    this.categoryRef = this.categories.getCategoryRefById(this.categoryId);

    this.subscribeToImages();
  }

  subscribeToImages(): void {
    this.imagesSubscription = this.images.getByCategoryRef(this.categoryRef).subscribe((images: IFGalleryItem[]) => {
      this.imgs = images;
      this.lastImgIdx = images.length > 0 ? Math.max.apply(Math, this.imgs.map(img => img.order)) : 0;
      this.cdRef.detectChanges();
    });
  }

  openUploadDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(UploadComponent, {
      maxWidth: 'auto',
      panelClass: 'container',
      data: {
        category: this.categoryRef,
        lastImgIdx: this.lastImgIdx
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

  onImageDrop(data: IDragAndDropOptions[]): void {
    const target1: IFGalleryItem = this.imgs.find(img => img.id === data[0].id);
    const target2: IFGalleryItem = this.imgs.find(img => img.id === data[1].id);
    this.images.changeImgOrder(target1, data[1].order);
    this.images.changeImgOrder(target2, data[0].order);
  }

  onImageDragging(isDragging: boolean): void {
    this.isDragging = isDragging;
  }
}
