import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

export interface IImageDialogData {
  title: string;
  url: string;
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
              private dialogRef: MatDialogRef<ImageDialogComponent>) {
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
    this.dialogRef.close(this.title);
  }

  onSubmit({ value }: { value: IDialogForm }): void {
    this.title = value.title;
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: [this.data.title, Validators.required]
    });
  }
}
