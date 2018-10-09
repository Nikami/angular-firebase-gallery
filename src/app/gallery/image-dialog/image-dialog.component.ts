import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface IImageDialogData {
  title: string;
  url: string;
}

@Component({
  selector: 'afg-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IImageDialogData) { }
}
