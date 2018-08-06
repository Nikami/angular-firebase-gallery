import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { GalleryService } from './services/gallery.service';

@Component({
  selector: 'afg-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @HostBinding('class') classList: string = 'd-flex flex-column w-100';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }
}
