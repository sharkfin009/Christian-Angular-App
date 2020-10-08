import {
  BrowserModule
} from '@angular/platform-browser'

import {
  NgModule
} from '@angular/core'
import {
  RouterModule
} from '@angular/router'
import {
  AppComponent
} from './app.component'
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations'
import {
  HttpClientModule,

} from '@angular/common/http'
import {
  HttpModule
} from '@angular/http'
import {
  PortfolioComponent
} from './portfolio/portfolio.component'
import {
  GetThumbnailsService
} from './shared/getThumbnails.service'

import {
  GalleryThumbnailComponent
} from './thumbnail/gallery-thumbnail.component'
import {
  appRoutes
} from './routes'
import FontFaceObserver from 'fontfaceobserver'

import {
  GalleryComponent
} from './gallery/gallery.component';
import {
  CommissionsComponent
} from './commissions/commissions.component';

import {
  ShowreelComponent
} from './showreel/showreel.component';

import {
  MenuComponent
} from './menu/menu.component';
import {
  LazyLoadImageModule
} from "ng-lazyload-image";
import {
  CommissionComponent
} from './commission/commission.component';

import {
  ShowcaseWrapperComponent
} from './showcase-wrapper/showcase-wrapper.component';
import {
  ShowcaseComponent
} from './showcase/showcase.component';

import {
  GridLightboxComponent
} from './grid-lightbox/grid-lightbox.component';
import {
  GetGridService
} from './shared/getGrid.service'
import {
  FileService
} from './file.service';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MCFormComponent } from './mcform/mcform.component'


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    GalleryThumbnailComponent,
    GalleryComponent,
    CommissionsComponent,
    ShowreelComponent,
    MenuComponent,
    CommissionComponent,
    ShowcaseWrapperComponent,
    ShowcaseComponent,

    GridLightboxComponent,
    AboutComponent,
    PrivacyComponent,
    MCFormComponent,
    // RouterOutletDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,

    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'disabled',
    }),
    LazyLoadImageModule,
  ],
  exports: [RouterModule],
  providers: [
    GetThumbnailsService,
    GetGridService,
    FileService,


  ],
  bootstrap: [AppComponent],
})
export class AppModule {};
