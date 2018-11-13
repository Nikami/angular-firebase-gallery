import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoriesService } from '../../services/categories.service';
import { first, map, startWith } from 'rxjs/operators';
import {
  IFGalleryCategory,
  IFGalleryItem
} from '../../../shared/shared.models';
import { Observable, of } from 'rxjs';
import { ImagesService } from '../../services/images.service';

interface IMoveImageData {
  category: string;
  img: IFGalleryItem;
}

interface IMoveImageForm {
  category: string;
}

@Component({
  selector: 'afg-move-image',
  templateUrl: './move-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveImageComponent implements OnInit {
  form: FormGroup;
  ctgs: IFGalleryCategory[] = [];
  filteredCategories: Observable<IFGalleryCategory[]>;
  errorMessage: string;

  @Input()
  set isDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMoveImageData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MoveImageComponent>,
    private cdRef: ChangeDetectorRef,
    private categories: CategoriesService,
    private images: ImagesService
  ) {}

  ngOnInit(): void {
    this.subscribeToCategories();
    this.createForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit({ value }: { value: IMoveImageForm }): void {
    this.errorMessage = '';
    this.isDisabled = true;

    let category: IFGalleryCategory = this.ctgs.find(
      (ct: IFGalleryCategory) => ct.name === value.category
    );
    if (category) {
      this.images.update(this.data.img, {
        category: this.categories.getCategoryRefById(category.id)
      });
      this.dialogRef.close();
    } else {
      this.errorMessage = 'MOVE_IMAGE.CATEGORY_IS_NOT_EXISTS';
      this.rebuildForm();
    }
  }

  private subscribeToCategories(): void {
    this.categories
      .get()
      .pipe(first())
      .subscribe((categories: IFGalleryCategory[]) => {
        this.ctgs = categories.filter(
          (ct: IFGalleryCategory) => ct.name !== this.data.category
        );
        this.filteredCategories = of(this.ctgs.slice());
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      category: ['', Validators.required]
    });

    this.filteredCategories = this.form.controls.category.valueChanges.pipe(
      startWith(''),
      map((category: string) =>
        category ? this.filterCategories(category) : this.ctgs.slice()
      )
    );
  }

  private filterCategories(value: string): IFGalleryCategory[] {
    const filterValue = value.toLowerCase();
    return this.ctgs.filter(
      category => category.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private rebuildForm(): void {
    this.form.reset();
    this.isDisabled = false;
  }
}
