import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { IFGalleryCategory } from '../../shared/shared.models';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'afg-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @HostBinding('class') classList: string = 'd-flex flex-column w-100';
  public ctgs: IFGalleryCategory[] = [];
  private categoriesSubscription: Subscription;

  constructor(private categories: CategoriesService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscibeToCategories();
  }

  subscibeToCategories(): void {
    this.categoriesSubscription = this.categories.get().subscribe((categories: IFGalleryCategory[]) => {
      this.ctgs = categories;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
