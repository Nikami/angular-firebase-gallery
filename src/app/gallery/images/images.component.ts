import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { IFGalleryItem } from '../../shared/shared.models';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material';
import { UploadComponent } from './upload/upload.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDragAndDropOptions } from '../../shared/directives/drag-and-drop.directive';
import { ImageComponent } from './image/image.component';
import { MoveImageComponent } from './move-image/move-image.component';
import { DocumentReference } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import {
  Spinner,
  SpinnerService
} from '../../spinner/services/spinner.service';

@Component({
  selector: 'afg-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit, OnDestroy {
  @ViewChild('imagesContainer') imagesContainer: ElementRef;

  private imagesSubscription: Subscription;
  private searchControlSubscription: Subscription;
  private categoryId: string;
  private lastImgIdx: number;
  private spinner: Spinner;

  public categoryName: string;
  public categoryRef: DocumentReference;
  public editMode: boolean = false;
  public imgs: IFGalleryItem[] = [];
  public isDragging: boolean = false;
  public searchControl: FormControl = new FormControl();
  public filteredImages: IFGalleryItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private categories: CategoriesService,
    private images: ImagesService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private spinnerService: SpinnerService
  ) {
    this.spinner = this.spinnerService.getGlobal();
  }

  ngOnInit(): void {
    this.spinner.run();
    this.categoryId = this.route.snapshot.queryParamMap.get('id');
    this.categoryName = this.route.snapshot.queryParamMap.get('name');
    this.categoryRef = this.categories.getCategoryRefById(this.categoryId);

    this.subscribeToImages();
    this.subscribeToSearch();
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
    this.searchControlSubscription.unsubscribe();
  }

  trackByFn(idx: number, img: IFGalleryItem): string {
    return img.id;
  }

  openUploadDialog(): void {
    this.editMode = false;
    this.dialog.closeAll();
    this.dialog.open(UploadComponent, {
      maxWidth: 'auto',
      panelClass: ['dialog-primary', 'container'],
      data: {
        category: this.categoryRef,
        lastImgIdx: this.lastImgIdx
      }
    });
  }

  removeImage(img: IFGalleryItem): void {
    this.images.remove(img);
  }

  moveImage(img: IFGalleryItem): void {
    this.dialog.closeAll();
    this.dialog.open(MoveImageComponent, {
      maxWidth: 'auto',
      panelClass: ['dialog-primary'],
      disableClose: true,
      data: { img, category: this.categoryName }
    });
  }

  onImageDrop(data: IDragAndDropOptions[]): void {
    const target1: IFGalleryItem = this.imgs.find(img => img.id === data[0].id);
    const target2: IFGalleryItem = this.imgs.find(img => img.id === data[1].id);
    this.images.update(target1, { order: data[1].order });
    this.images.update(target2, { order: data[0].order });
  }

  onImageDragging(isDragging: boolean): void {
    this.isDragging = isDragging;

    if (isDragging) {
      this.renderer.addClass(this.imagesContainer.nativeElement, 'dragging');
    } else {
      this.renderer.removeClass(this.imagesContainer.nativeElement, 'dragging');
    }
  }

  openImageDialog(img: IFGalleryItem): void {
    if (!this.editMode) {
      this.dialog.closeAll();
      this.dialog.open(ImageComponent, {
        maxWidth: 'auto',
        panelClass: ['dialog-primary', 'container'],
        disableClose: true,
        data: { img }
      });
    }
  }

  private subscribeToImages(): void {
    this.imagesSubscription = this.images
      .getByCategoryRef(this.categoryRef)
      .subscribe((images: IFGalleryItem[]) => {
        this.imgs = images;
        this.lastImgIdx =
          images.length > 0
            ? Math.max.apply(Math, this.imgs.map(img => img.order))
            : 0;
        this.searchControl.patchValue(this.searchControl.value || '');
        this.spinner.stop();
      });
  }

  // TODO: mb refactor search to component in future
  private subscribeToSearch(): void {
    this.searchControlSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        map((title: string) =>
          title ? this.filterImages(title) : this.imgs.slice()
        )
      )
      .subscribe((images: IFGalleryItem[]) => {
        this.filteredImages = images;
        this.cdRef.detectChanges();
      });
  }

  private filterImages(value: string): IFGalleryItem[] {
    const filterValue = value.toLowerCase();
    return this.imgs.filter(
      (image: IFGalleryItem) =>
        image.title.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
