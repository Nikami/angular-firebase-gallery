import { Component, HostBinding } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { UploadedFile } from './uploaded-file';

@Component({
  selector: 'afg-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @HostBinding('class') classList: string = 'd-flex flex-column align-items-center justify-content-center';

  private BASE_PATH: string = 'me/smiles/me_';
  private task: AngularFireUploadTask;

  uploadedFiles: Array<UploadedFile> = [];
  isHovering: boolean;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList): void {
    const files = Array.from(event);

    files.forEach((file: File) => {
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
        return;
      }

      const path = this.BASE_PATH + file.name;
      this.task = this.storage.upload(path, file);

      const fileProgress = this.task.percentageChanges();
      const uploadedFile: UploadedFile = new UploadedFile(file.name, file.size, path, fileProgress);
      this.uploadedFiles.push(uploadedFile);
    });
  }

  clearUploadedFiles(): void {
    this.uploadedFiles = [];
  }
}
