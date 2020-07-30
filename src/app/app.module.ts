import {
  BrowserModule
} from '@angular/platform-browser'
import {
  RetainScrollPolyfillModule
}
from "./retain-scroll-polyfill/retain-scroll-polyfill.module"

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
  HttpClientModule
} from '@angular/common/http'

import {
  PortfolioComponent
} from './portfolio/portfolio.component'
import {
  GetThumbnailsService
} from './shared/getThumbnails.service'
import {
  GetPreloadPicsService
}
from './shared/getPreloadPics.service'
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
  PostsComponent
} from './posts/posts.component';
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
  GetGalleriesService
} from './shared/getGalleries.service'
import {
  GetCommissionService
} from './shared/get-commission.service'
import {
  GetPostsService
} from './shared/get-posts.service'
import LogRocket from "logrocket";
import { AboutComponent } from './about/about.component';
import { GalleryWrapperComponent } from './gallery-wrapper/gallery-wrapper.component';
import { ShowcaseComponent } from './showcase/showcase.component';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    GalleryThumbnailComponent,
    GalleryComponent,
    CommissionsComponent,
    PostsComponent,
    ShowreelComponent,
    MenuComponent,
    CommissionComponent,
    AboutComponent,
    GalleryWrapperComponent,
    ShowcaseComponent,
    // RouterOutletDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{
      scrollPositionRestoration: 'enabled',
      anchorScrolling:'disabled',
    }),
    LazyLoadImageModule,
   // RetainScrollPolyfillModule,
  ],
  exports: [RouterModule],
  providers: [
    GetThumbnailsService,
    GetPreloadPicsService,
    GetGalleriesService,
    GetCommissionService,
    GetPostsService,
    GetCommissionService,


  ],
  bootstrap: [AppComponent],
})
export class AppModule {};
