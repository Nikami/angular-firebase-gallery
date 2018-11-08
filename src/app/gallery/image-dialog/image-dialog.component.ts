import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ImagesService } from '../services/images.service';
import { IFGalleryItem } from '../../shared/shared.models';

export interface IImageDialogData {
  img: IFGalleryItem;
}

interface IDialogForm {
  title: string;
}

@Component({
  selector: 'afg-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDialogComponent implements OnInit {
  @ViewChild('ngForm') ngForm: NgForm;
  @ViewChild('title') private titleEl: ElementRef;

  title: string;
  editMode: boolean = false;
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IImageDialogData,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<ImageDialogComponent>,
              private images: ImagesService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.form.disable();
    this.dialogRef.backdropClick().subscribe(() => this.close());
  }

  enableForm(): void {
    this.editMode = true;
    this.form.enable();
    this.titleEl.nativeElement.focus();
  }

  disableForm(): void {
    this.editMode = false;
    this.form.disable();
  }

  close(): void {
    this.dialogRef.close();
  }

  onSubmit({ value }: { value: IDialogForm }): void {
    this.title = value.title;
    this.renameImg();
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: [this.data.img.title, Validators.required]
    });
  }

  private renameImg(): void {
    if (this.title && this.title !== this.data.img.title) {
      this.images.rename(this.data.img, this.title);
    }
  }
}
