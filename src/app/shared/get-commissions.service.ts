import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import {
  shareReplay, map
} from 'rxjs/operators';
import { Commission } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetCommissionsService {
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/getCommission/v1/";
  galleries$: Observable < any > ;
  constructor(private http: HttpClient) {

  }



  getCommissionsThumbnailLayout(){
    let CommissionsThumbnailLayoutAPI = "http://wpbackend.dreamhosters.com/index.php/wp-json/commissions_endpoint/v1/getThumbs";

    return this.http.get<any>(CommissionsThumbnailLayoutAPI).pipe(
      map(grid => {

        let newHTMLDoc = document.implementation.createHTMLDocument('gridPrep')
        let gridLoaded = newHTMLDoc.createElement('div');
        gridLoaded.innerHTML = grid;
        let flexString = " .lg-column-wrap{display:-webkit-flex;display:-ms-flexbox;display:flex;}.lg-align-middle{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;} .lg-col{position:relative;display:inline-block;z-index:1;pointer-events:auto;}  .lg-column-wrap{position:relative;width:100%;z-index:1;pointer-events:none;}.lg-row-inner{width:100%;position:relative;}.lg-type-img{position:relative;}.lg-placeholder > *{position:absolute;top:0;left:0;width:100%;height:100%;}.lg-placeholder{position:relative;}";
        let animString = ".q{opacity:0;transition:opacity 1s ease-out}";
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
       let wrappers = gridLoaded.querySelectorAll(".lg-type-img")
        let names= [];
        let srcUrls = [];
        wrappers.forEach(
          (item,index)=>{
            names[index]=item.getAttribute("id");
          }
        )

        imgs.forEach(
          (item) => {
            srcUrls.push(item.getAttribute("src"));
            item.setAttribute("data-src", item.src);
            item.setAttribute('src',"");
            item.setAttribute("srcset", "");
            item.setAttribute("currentSrc","")
          }


        );




        //create string from final grid element
        let wrapper = newHTMLDoc.createElement('div');
        wrapper.appendChild(gridLoaded);
        let gridString = wrapper.innerHTML;


        return {
          grid: gridString,
          names:names,
          srcUrls: srcUrls,
        }

      }),
        shareReplay(1),

    );
  }
 }

