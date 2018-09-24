import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { UploadedFile } from './uploaded-file';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../services/images.service';
import { UtilsService } from '../../core/http/utils.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FIRE_STORAGE_PATH } from '../../app.config';

export interface IUploadData {
  category: DocumentReference;
  lastImgIdx: number;
}

@Component({
  selector: 'afg-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @HostBinding('class') classList: string = 'w-100';

  private task: AngularFireUploadTask;

  uploadedFiles: Array<UploadedFile> = [];
  isHovering: boolean;

  constructor(private dialogRef: MatDialogRef<UploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IUploadData,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private db: AngularFirestore,
              private images: ImagesService,
              private utils: UtilsService) {
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  startUpload(event: FileList): void {
    const files: File[] = Array.from(event);
    let orderIdx: number = this.data.lastImgIdx;

    files.forEach((file: File) => {
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
        return;
      }

      const uid = this.utils.generateUID();
      const path = FIRE_STORAGE_PATH + uid;

      orderIdx++;
      this.task = this.storage.upload(path, file);

      const fileRef = this.storage.ref(path);
      const uploadedFile: UploadedFile = new UploadedFile
      (
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
