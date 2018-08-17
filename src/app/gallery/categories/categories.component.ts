import { Component, HostBinding } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Observable } from 'rxjs/internal/Observable';
import { IFGalleryCategory } from '../../shared/shared.models';

interface IQueryParams {
  id: string;
  name: string;
}

@Component({
  selector: 'afg-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @HostBinding('class') classList: string = 'row flex-wrap w-100';
  categories$: Observable<IFGalleryCategory[]>;

  constructor(private categories: CategoriesService) {
    this.categories$ = this.categories.get();
    this.categories$.subscribe((categories) => {
      console.log('categories =', categories);
    });
  }

  makeQueryParams(category: IFGalleryCategory): IQueryParams {
    return {
      id: category.id,
      name: category.name
    };
  }
}
