import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieModule, CookieService } from 'ngx-cookie';
import { UtilsService } from './services/utils.service';
import { FirebaseApiService } from './services/firebase-api.service';
import { environment } from '../../environments/environment';
import { SessionExpirationService } from './services/session-expiration.service';
import { OfflineService } from './services/offline.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    AngularFireModule.initializeApp(
      environment.firebase,
      'angular-firebase-gallery'
    ),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CookieModule.forRoot()
  ],
  declarations: [],
  providers: [
    CookieService,
    FirebaseApiService,
    SessionExpirationService,
    OfflineService,
    UtilsService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import Core modules in the AppModule only.'
      );
    }
  }
}
