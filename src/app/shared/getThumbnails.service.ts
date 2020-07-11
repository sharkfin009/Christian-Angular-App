import {
  Injectable,
  OnInit
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';
import { shareReplay, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GalleryThumb } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetThumbnailsService {
   private galleriesUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/bens_custom_endpoint/v1/getThumbnails";
  thumbnails$:Observable<GalleryThumb[]>;

   constructor(private http: HttpClient) {
    this.storeThumbnails();
   }

   storeThumbnails(){
     this.thumbnails$ = this.getThumbnails();
   }

  getThumbnails():Observable<GalleryThumb[]>{
    return this.http.get<GalleryThumb[]>(this.galleriesUrl)
  .pipe(

    shareReplay(1)

  )
  }
}
