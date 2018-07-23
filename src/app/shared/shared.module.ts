import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material';


const components = [];

const services = [];

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule],
  declarations: [...components],
  exports: [MaterialModule, TranslateModule, ...components],
  providers: [...services]
})
export class SharedModule {}
