import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GalleryComponent } from './gallery/gallery.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { WpRESTmoduleService } from './shared/wp_rest_module.service';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ WpRESTmoduleService ],
  bootstrap: [AppComponent]
})
export class AppModule { };
