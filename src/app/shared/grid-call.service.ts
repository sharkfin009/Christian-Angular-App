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
  Title
} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GridCallService {
  private apiUrl = "http://localhost:8888/wordpress/index.php/wp-json/bens_custom_endpoint/v1/getPostsWithGrids";

  grids$ = this.http.get < Grid[] > (this.apiUrl)
    .pipe(
      map(grids =>
        grids.map(grid => {
          let gridLoaded = document.createElement('div');
          gridLoaded.innerHTML = grid.grid;
          let flexString = " .lg-column-wrap{display:-webkit-flex;display:-ms-flexbox;display:flex;}.lg-align-middle{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;} .lg-col{position:relative;display:inline-block;z-index:1;pointer-events:auto;}  .lg-column-wrap{position:relative;width:100%;z-index:1;pointer-events:none;}.lg-row-inner{width:100%;position:relative;}.lg-type-img{position:relative;}.lg-placeholder > *{position:absolute;top:0;left:0;width:100%;height:100%;}.lg-placeholder{position:relative;}";
          let animString = "@keyframes fadeInUp {from{opacity: 1;transform: translate3d(0, 150%, 0);}to{opacity: 1;transform: translate3d(0, 0, 0);}}.q{animation-name: fadeInUp;animation-duration:3s;}";
          let mobileQuery = "    @media (max-width: 700px){.lg-desktop-grid .lg-col{width:100%;transform:none!important;-webkit-transform:none!important;}.lg-desktop-grid.lg-grid{padding-top:5vw;padding-bottom:5vw;}.lg-desktop-grid .lg-row{padding-left:5vw;padding-right:5vw;}.lg-desktop-grid .lg-col{margin-bottom:5vw;}.lg-desktop-grid .lg-row:last-child .lg-col:last-child{margin-bottom:0;} */}";
          let style = flexString + animString + mobileQuery + gridLoaded.querySelector('style').innerHTML;
          let imgElements = gridLoaded.querySelectorAll("img");
          imgElements.forEach(item => {
            item.className += "q";
          })
          gridLoaded.querySelector('style').innerHTML = style;
          let title = grid.title;
          let id = title.slice(title.length-2);
          let imgTags=gridLoaded.querySelectorAll('img');
          let routerLinkValue= "['/id','" +id + "']";
          imgTags.forEach(item=>{
            item.setAttribute('data-id',id);
            item.setAttribute('routerLink',routerLinkValue);
          });
          return {
            title: grid.title,
            grid: gridLoaded.innerHTML,
            style: style,
            attachedMedia: grid.attachedMedia,
          } as Grid
        })
      ),
      shareReplay(1),
      tap(item => console.dir(item)),
    );

  constructor(private http: HttpClient) {}
}
