import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { IFGalleryCategory } from '../../shared/shared.models';
import { Subscription } from 'rxjs/internal/Subscription';

interface IQueryParams {
  id: string;
  name: string;
}

@Component({
  selector: 'afg-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @HostBinding('class') classList: string = 'row flex-wrap w-100';
  public ctgs: IFGalleryCategory[] = [];
  private categoriesSubscription: Subscription;

  constructor(private categories: CategoriesService) {
  }

  ngOnInit(): void {
    this.subscibeToCategories();
  }

  subscibeToCategories(): void {
    this.categoriesSubscription = this.categories.get().subscribe((categories: IFGalleryCategory[]) => {
      this.ctgs = categories;
    });
  }

  makeQueryParams(category: IFGalleryCategory): IQueryParams {
    return {
      id: category.id,
      name: category.name
    };
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
