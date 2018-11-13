import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoriesService } from '../../services/categories.service';
import { IFGalleryCategory } from '../../../shared/shared.models';

export interface IRenameCategoryData {
  category: IFGalleryCategory;
}

interface IRenameCategoryForm {
  name: string;
}

@Component({
  selector: 'afg-rename-category',
  templateUrl: './rename-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenameCategoryComponent {
  form: FormGroup;

  @Input()
  set isDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IRenameCategoryData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IRenameCategoryForm>,
    private cdRef: ChangeDetectorRef,
    private categories: CategoriesService
  ) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: [this.data.category.name, Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit({ value }: { value: IRenameCategoryForm }): void {
    this.isDisabled = true;

    if (this.data.category.name !== value.name) {
      this.categories.update(this.data.category, { name: value.name });
    }

    this.closeDialog();
  }
}
