import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Spinner, SpinnerService } from '../spinner/services/spinner.service';

@Component({
  selector: 'afg-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {
  public spinner: Spinner;

  constructor(private spinnerService: SpinnerService) {
    this.spinner = this.spinnerService.getGlobal();
  }
}
