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
  AppRoutingModule
} from './app-routing.module'
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
import { GetGalleriesService } from './shared/getGalleries.service'
import { GalleriesResolverService} from './shared/galleriesResolver.service';
import { CommissionsComponent } from './commissions/commissions.component'


@NgModule({
  declarations: [
    AppComponent,
   PortfolioComponent,
     GalleryThumbnailComponent,
     GalleryComponent,
     CommissionsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
     GetThumbnailsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
