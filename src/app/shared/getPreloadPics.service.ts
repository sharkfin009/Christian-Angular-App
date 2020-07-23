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
import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetPreloadPicsService {
  // private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/galleries_endpoint/v1/getGalleries";
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/galleries_endpoint/v1/getGallery/";
  galleries$: Observable < any > ;
  constructor(private http: HttpClient) {

  }



  getFirstFourPics(slug): Observable < any > {
    return this.http.get < any > (this.apiUrl + slug)
      .pipe(
        map(grid => {
          // let newHTMLDoc = document.implementation.createHTMLDocument('gridPrep')
          // let gridLoaded = newHTMLDoc.createElement('div');
          // gridLoaded.innerHTML = grid;
          // let srcUrls=[];
          // let fourPics = [];
          // let imgs= gridLoaded.querySelectorAll('img');
          // imgs.forEach(
          //   (item)=>{
          //     srcUrls.push(item.getAttribute('src'))
          //   }
          // )
          // for (let i=0; i<1; i++){
          //   if(srcUrls[1])
          //   fourPics.push(srcUrls[i]);
          // }
          // return fourPics;

          return grid;
        })
      )
      }
  }
