import {
  Injectable,
  OnInit
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetThumbnailsService {
   private galleriesUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/bens_custom_endpoint/v1/getThumbnails";
  thumbnails$:Observable<any>;

   constructor(private http: HttpClient) {
    this.storeThumbnails();
   }

   storeThumbnails(){
     this.thumbnails$ = this.getThumbnails();
   }

  getThumbnails():Observable<any>{
    return this.http.get(this.galleriesUrl)
  .pipe(
    shareReplay(1)
  )
  }
}
