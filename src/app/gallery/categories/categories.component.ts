import { Component, HostBinding, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Observable } from 'rxjs/internal/Observable';
import { IFGalleryCategory } from '../../shared/shared.models';

@Component({
  selector: 'afg-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @HostBinding('class') classList: string = 'row flex-wrap w-100';
  categories$: Observable<IFGalleryCategory[]>;

  constructor(private categories: CategoriesService) {
    this.categories$ = this.categories.get();
    this.categories$.subscribe((categories) => {
      console.log('categories =', categories);
    });
  }

  ngOnInit() {
  }

  selectCategory(id: string): void {
    this.categories.getImages(id).subscribe((im) => {
      console.log('im =', im);
    });
  }

}
