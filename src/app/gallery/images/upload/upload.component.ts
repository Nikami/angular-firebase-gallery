import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject
} from '@angular/core';
import { UploadedFile } from './uploaded-file';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { UtilsService } from '../../../core/services/utils.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FIRE_STORAGE_PATH } from '../../../app.config';
import { FirebaseApiService } from '../../../core/services/firebase-api.service';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { DocumentReference } from '@angular/fire/firestore';

export interface IUploadData {
  category: DocumentReference;
  lastImgIdx: number;
}

@Component({
  selector: 'afg-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent {
  @HostBinding('class') classList: string = 'w-100';

  private task: AngularFireUploadTask;

  uploadedFiles: Array<UploadedFile> = [];
  isHovering: boolean;
  isUnsupportedFileType: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUploadData,
    private route: ActivatedRoute,
    private fapi: FirebaseApiService,
    private images: ImagesService,
    private utils: UtilsService,
    private cdRef: ChangeDetectorRef
  ) {}

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  startUpload(event: FileList): void {
    const files: File[] = Array.from(event);
    let orderIdx: number = this.data.lastImgIdx;

    files.forEach((file: File) => {
      if (file.type.split('/')[0] !== 'image') {
        this.isUnsupportedFileType = true;
        return;
      }

      this.isUnsupportedFileType = false;

      const uid = this.utils.generateUID();
      const path = FIRE_STORAGE_PATH + uid;

      orderIdx++;
      this.task = this.fapi.uploadToStorage(path, file);

      const fileRef = this.fapi.getStorageRef(path);
      const uploadedFile: UploadedFile = new UploadedFile(
        uid,
        file.name,
        this.data.category,
        file.size,
        this.task.percentageChanges(),
        orderIdx
      );

      this.uploadedFiles.push(uploadedFile);

      this.task.then(() => {
        fileRef.getDownloadURL().subscribe((url: string) => {
          uploadedFile.url = url;
          this.images.add(uploadedFile.getItem());
          this.cdRef.detectChanges();
        });
      });
    });
  }

  clearUploadedFiles(): void {
    this.uploadedFiles = [];
  }

  closeDialog(): void {
    this.clearUploadedFiles();
    this.dialogRef.close();
  }
}
