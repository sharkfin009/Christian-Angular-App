import {
  Injectable,
  OnInit
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';
import { shareReplay, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GalleryThumb,CommissionThumb } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetThumbnailsService {
   private galleriesUrl = "https://wpbackend.dreamhosters.com/index.php/wp-json/thumbnails_endpoint/v1/thumbs";
   private commissionsUrl = "https://wpbackend.dreamhosters.com/index.php/wp-json/commissions_endpoint/v1/getThumbs";
  thumbnails$:Observable<GalleryThumb[]>;

   constructor(private http: HttpClient) {
    // this.storeThumbnails();
   }

  //  storeThumbnails(){
  //    this.thumbnails$ = this.getThumbnails();
  //  }

  getThumbnails(view): Observable <any>{
    let url="";
    switch(view){
      case "portfolio":
      url= this.galleriesUrl;
      return this.http.get<GalleryThumb[]>(url )
      .pipe(

        shareReplay(1)

      )
      break;
      case "commissions":
        url = this.commissionsUrl;
        return this.http.get  <any>(url )
        .pipe(
          map(grid=>{
           //console.dir(grid)
            let newHTMLDoc = document.implementation.createHTMLDocument("grid");
            let gridLoaded = newHTMLDoc.createElement('div');
            gridLoaded.innerHTML=  grid;

            let comImgs = gridLoaded.querySelectorAll('img');
            console.log(gridLoaded)
           let comThumbs = [];
           comImgs.forEach(((item,index)=>{
            let obj ={
              slug:item.parentNode.parentNode.id,
              title:item.parentNode.parentNode.id,
              url:item.src,

            };
            comThumbs[index] = obj
           }));
           return comThumbs;
        }),
          shareReplay(1)

        )



    }

  }
}
