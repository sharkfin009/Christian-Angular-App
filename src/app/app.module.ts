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

import { ShowreelComponent } from './showreel/showreel.component';
import { PostsComponent } from './posts/posts.component';
import { MenuComponent } from './menu/menu.component';
import { LazyLoadImageModule } from "ng-lazyload-image";


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
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    LazyLoadImageModule,
  ],
  providers: [
     GetThumbnailsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
