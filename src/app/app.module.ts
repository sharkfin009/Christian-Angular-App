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
  GalleryComponent
} from './gallery/gallery.component'
 import {
  PortfolioComponent
 } from './portfolio/portfolio.component'
import {
  WpRESTmoduleService
} from './shared/wp_rest_module.service'
import {
  GalleryThumbnailComponent
 } from './gallery-thumbnail/gallery-thumbnail.component'
import {
  appRoutes
} from './routes'
import {
  GalleriesResolverService
} from './shared/galleries_resolver.service';
import { GridGalleryComponent } from './grid-gallery/grid-gallery.component';
import { LightboxComponent } from './lightbox/lightbox.component'


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
   PortfolioComponent,
     GalleryThumbnailComponent,
     GridGalleryComponent,
     LightboxComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
     WpRESTmoduleService,
     GalleriesResolverService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
