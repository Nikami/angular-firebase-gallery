import { Component, HostBinding } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { UploadedFile } from './uploaded-file';

@Component({
  selector: 'afg-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @HostBinding('class') classList: string = 'w-100';

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

      const fileRef = this.storage.ref(path);
      const fileProgress = this.task.percentageChanges();
      const uploadedFile: UploadedFile = new UploadedFile(file.name, file.size, fileProgress);
      this.uploadedFiles.push(uploadedFile);

      this.task.then(() => {
        fileRef.getDownloadURL().subscribe((url: string) => {
          uploadedFile.url = url;
        });
      });
    });
  }

  clearUploadedFiles(): void {
    this.uploadedFiles = [];
  }
}
