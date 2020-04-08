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
  Gallery,
} from "./interfaces"
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetGalleriesService {
  // private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/galleries_endpoint/v1/getGalleries";
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/galleries_endpoint/v1/getGalleries";
  galleries$: Observable<any>;
  constructor(private http: HttpClient) {
    this.storeGalleries();
  }

  storeGalleries(){
    this.galleries$ = this.getGalleries()
  }
 getGalleries():Observable<any>{
   return this.http.get < Gallery[] > (this.apiUrl)
    .pipe(
      map(galleries =>
        galleries.map(gallery => {
          let newHTMLDoc = document.implementation.createHTMLDocument('gridPrep')
          let gridLoaded = newHTMLDoc.createElement('div');
          gridLoaded.innerHTML = gallery.grid;
          let flexString = " .lg-column-wrap{display:-webkit-flex;display:-ms-flexbox;display:flex;}.lg-align-middle{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;} .lg-col{position:relative;display:inline-block;z-index:1;pointer-events:auto;}  .lg-column-wrap{position:relative;width:100%;z-index:1;pointer-events:none;}.lg-row-inner{width:100%;position:relative;}.lg-type-img{position:relative;}.lg-placeholder > *{position:absolute;top:0;left:0;width:100%;height:100%;}.lg-placeholder{position:relative;}";
          let animString = "@keyframes fadeInUp {from{opacity: 1;transform: translate3d(0, 150%, 0);}to{opacity: 1;transform: translate3d(0, 0, 0);}}.q{}";

          let mobileQuery = "@media (max-width: 700px){.lg-desktop-grid .lg-col{width:100%;transform:none!important;-webkit-transform:none!impo }.lg-desktop-grid.lg-grid{padding-top:5vw;padding-bottom:5vw;}.lg-desktop-grid .lg-row{padding-left:5vw;padding-right:5vw;}.lg-desktop-grid .lg-col{margin-bottom:5vw;}.lg-desktop-grid .lg-row:last-child .lg-col:last-child{margin-bottom:0;} }";
           let style = flexString + animString + mobileQuery + gridLoaded.querySelector('style').innerHTML;
           let imgElements = gridLoaded.querySelectorAll("img");
           imgElements.forEach(item => {
             item.className += "q pointer ";
          })
          //add strings to style tag
          gridLoaded.querySelector('style').innerHTML = style;
          //create array of src and srcset atts
          let imgs = gridLoaded.querySelectorAll("img");
          let srcSetUrls=[];
          let srcUrls=[];

          imgs.forEach(
            (item)=>{
              srcSetUrls.push(item.getAttribute("srcset"));
              srcUrls.push(item.getAttribute("src"));
              item.setAttribute("src","");
              item.setAttribute("srcset","")
            }
          );

          //create string from final grid element
          let wrapper = newHTMLDoc.createElement('div');
          wrapper.appendChild(gridLoaded);
          let gridString= wrapper.innerHTML;

          //preload first 4 images
          let preload = document.createElement('div');

          for (let i=0;i<=4;i++){
            let imgPreload=document.createElement('img');
            preload.appendChild(imgPreload);
            imgPreload.src = srcUrls[i];
          }




          return {
            slug: gallery.slug,
            grid: gridString,
            srcSetUrls: srcUrls,
          } as Gallery
        })
      ),
      shareReplay(1),
    );
      }
}
