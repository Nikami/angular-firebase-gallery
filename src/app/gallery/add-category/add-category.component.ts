import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { first } from 'rxjs/operators';

interface IAddCategoryForm {
  name: string;
}

@Component({
  selector: 'afg-add-category',
  templateUrl: './add-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent {
  form: FormGroup;

  @Input()
  set isDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddCategoryComponent>,
              private cdRef: ChangeDetectorRef,
              private categories: CategoriesService) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit({ value }: { value: IAddCategoryForm }): void {
    this.isDisabled = true;
    this.categories.add(value).pipe(
      first()
    ).subscribe(() => this.closeDialog());
  }
}
