import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  declarations: [SpinnerComponent],
  providers: [SpinnerService],
  exports: [SpinnerComponent]
})
export class SpinnerModule {}
