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
  GalleryThumbnailComponent
 } from './thumbnail/gallery-thumbnail.component'
import {
  appRoutes
} from './routes'

import { GalleryComponent } from './gallery/gallery.component';
import { CommissionsComponent } from './commissions/commissions.component';

import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video/video.component';
import { PostsComponent } from './posts/posts.component';


@NgModule({
  declarations: [
    AppComponent,
   PortfolioComponent,
     GalleryThumbnailComponent,
     GalleryComponent,
     CommissionsComponent,
     PostsComponent,
     VideosComponent,
     VideoComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
     GetThumbnailsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
