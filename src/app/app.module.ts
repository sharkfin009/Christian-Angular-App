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

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{
      scrollPositionRestoration: "enabled",

    }),

    LazyLoadImageModule,

  ],
  exports:[RouterModule],
  providers: [
    GetThumbnailsService,
    GetPreloadPicsService,
    GetGalleriesService,
    GetCommissionService,
    GetPostsService,
    GetCommissionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
