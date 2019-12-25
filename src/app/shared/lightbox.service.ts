import {
  Injectable
} from '@angular/core';
import {
  map,
  tap,
  shareReplay
} from 'rxjs/operators'
import {
  HttpClient,
} from '@angular/common/http';
import {
  Grid
} from "../portfolio/grid"
import {
  of
} from 'rxjs';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/getLightboxGrids/v1/";
  gallery: string;


  lightboxes$ = this.http.get < Grid[] > (this.apiUrl + this.gallery)
    .pipe(
      map(lightboxes =>
        lightboxes.map(lightbox => {
          console.log(lightbox);
          let div = document.createElement("div");
          div.innerHTML = lightbox.grid;
          let flexString = " .lg-column-wrap{display:-webkit-flex;display:-ms-flexbox;display:flex;}.lg-align-middle{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;} .lg-col{position:relative;display:inline-block;z-index:1;pointer-events:auto;}  .lg-column-wrap{position:relative;width:100%;z-index:1;pointer-events:none;}.lg-row-inner{width:100%;position:relative;}.lg-type-img{position:relative;}.lg-placeholder > *{position:absolute;top:0;left:0;width:100%;height:100%;}.lg-placeholder{position:relative;}";
          div.querySelector("style").innerHTML += flexString;
          return{
            grid:lightbox.grid,
            title:lightbox.title,
            div:div,
          } as Grid
        })
      ),
      shareReplay(1),
    );

  constructor(private http: HttpClient) {}

  setGalleryName(gallery: string) {
    this.gallery = gallery;
  }
}
