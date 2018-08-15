import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { IFGalleryItem } from '../../shared/shared.models';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentReference } from 'angularfire2/firestore';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'afg-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  categoryId: string;
  categoryRef: DocumentReference;
  images$: Observable<IFGalleryItem[]>;

  constructor(private route: ActivatedRoute,
              private categories: CategoriesService,
              private images: ImagesService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.queryParamMap.get('filter');
    this.categoryRef = this.categories.getCategoryRefById(this.categoryId);
    this.images$ = this.images.getByCategoryRef(this.categoryRef);
    this.images$.subscribe((images) => {
      console.log('images =', images);
    });
  }

}
