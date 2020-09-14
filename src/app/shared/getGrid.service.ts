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
  Grid,
} from "./interfaces"
import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetGridService {
  private galleryApiUrl = "https://wpbackend.dreamhosters.com/index.php/wp-json/galleries_endpoint/v1/getGallery/";
  private contactApiUrl = "https://wpbackend.dreamhosters.com/index.php/wp-json/getAboutPage/v1/please";
  private commissionApiUrl = "https://wpbackend.dreamhosters.com/index.php/wp-json/getCommission/v1/";
  spinner: any;


  constructor(private http: HttpClient) {

  }

  getGrid(view, slug =''): Observable < any > {
    let apiUrl = "";
    switch (view) {
      case "gallery":
        apiUrl = this.galleryApiUrl + slug;
        break;
      case "contact":
        apiUrl = this.contactApiUrl;
        break;
      case "commission":
        apiUrl = this.commissionApiUrl + slug;

        break;
      case "showcase":
        apiUrl = this.galleryApiUrl + "/overview"
        this.spinner = document.querySelector(".spinner-cursor");
        this.spinner.style.display = "block";
      break;
    };

    return this.http.get < any > (apiUrl)
      .pipe(
        map(grid => {
          let newHTMLDoc = document.implementation.createHTMLDocument('gridPrep')
          let gridLoaded = newHTMLDoc.createElement('div');
          gridLoaded.innerHTML = grid;

          let flexString = " .lg-column-wrap{display:-webkit-flex;display:-ms-flexbox;display:flex;}.lg-align-middle{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;} .lg-col{position:relative;display:inline-block;z-index:1;pointer-events:auto;}  .lg-column-wrap{position:relative;width:100%;z-index:1;pointer-events:none;}.lg-row-inner{width:100%;position:relative;}.lg-type-img{position:relative;}.lg-placeholder > *{position:absolute;top:0;left:0;width:100%;height:100%;}.lg-placeholder{position:relative;}";
          let animString = ".q{transition:opacity ease-out 2s, transform ease-out 1s;transform:translateY(300px)}";

          let mobileQuery = "@media (max-width: 700px){.lg-desktop-grid .lg-col{width:100%;transform:none!important;-webkit-transform:none!impo }.lg-desktop-grid.lg-grid{padding-top:5vw;padding-bottom:5vw;}.lg-desktop-grid .lg-row{padding-left:5vw;padding-right:5vw;}.lg-desktop-grid .lg-col{margin-bottom:5vw;}.lg-desktop-grid .lg-row:last-child .lg-col:last-child{margin-bottom:0;} }";
          let style = flexString +  mobileQuery + gridLoaded.querySelector('style').innerHTML;
          let imgElements = gridLoaded.querySelectorAll("img");
          imgElements.forEach(item => {
            item.className += "q pointer-styled";
          })
          //add strings to style tag
          gridLoaded.querySelector('style').innerHTML = style;
          //create array of src and srcset atts
          let imgs = gridLoaded.querySelectorAll("img");
          let srcSets = [];
          let srcUrls = [];

          imgs.forEach(
            (item) => {
              srcSets.push(item.getAttribute("srcset"));
              srcUrls.push(item.getAttribute("src"));
              item.setAttribute("data-src", item.src);
              item.src = "";
              item.setAttribute("srcset", "");
              item.setAttribute("currentSrc", "")
            }
          );

          //create string from final grid element
          let wrapper = newHTMLDoc.createElement('div');
          wrapper.appendChild(gridLoaded);
          let gridString = wrapper.innerHTML;


          return {
            grid: gridString,
            srcSets: srcSets,
            srcUrls: srcUrls,
            gridType: view,
          }

        }),
        shareReplay(1),
      );
  };







}
