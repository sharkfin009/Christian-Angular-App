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
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/getCommissions/v1/please";
  commissions$: Observable < Commission[] >
    constructor(private http: HttpClient) {
      this.storeCommissions();
    }
  storeCommissions() {
    this.commissions$ = this.getCommissions();
  }
  getCommissions():Observable<Commission[]>{
    return this.http.get < Commission[] > (this.apiUrl)
     .pipe(
       map(commissions =>
         commissions.map(commission => {
           let tempDoc = document.implementation.createHTMLDocument("gridPrep");

           let gridLoaded = tempDoc.createElement('div');
           gridLoaded.innerHTML = commission.grid;
           let flexString = " .lg-column-wrap{display:-webkit-flex;display:-ms-flexbox;display:flex;}.lg-align-middle{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;} .lg-col{position:relative;display:inline-block;z-index:1;pointer-events:auto;}  .lg-column-wrap{position:relative;width:100%;z-index:1;pointer-events:none;}.lg-row-inner{width:100%;position:relative;}.lg-type-img{position:relative;}.lg-placeholder > *{position:absolute;top:0;left:0;width:100%;height:100%;}.lg-placeholder{position:relative;}";

           let mobileQuery = "@media (max-width: 700px){.lg-desktop-grid .lg-col{width:100%;transform:none!important;-webkit-transform:none!important;}.lg-desktop-grid.lg-grid{padding-top:5vw;padding-bottom:5vw;}.lg-desktop-grid .lg-row{padding-left:5vw;padding-right:5vw;}.lg-desktop-grid .lg-col{margin-bottom:5vw;}.lg-desktop-grid .lg-row:last-child .lg-col:last-child{margin-bottom:0;} }";

           let style = flexString + mobileQuery + gridLoaded.querySelector('style').innerHTML;
           let imgElements = gridLoaded.querySelectorAll("img");
           imgElements.forEach(item => {
             item.className += "q pointer zoomTarget";
             item.src="";
             item.srcset ="";
           })
           gridLoaded.querySelector('style').innerHTML = style;
           return {
             slug: commission.slug,
             grid: gridLoaded.innerHTML,
            title: commission.title,
            names: commission.names,
           }as Commission

         })
       ),
       shareReplay(1),
     );
       }
 }

