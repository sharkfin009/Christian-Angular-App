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
   private galleriesUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/thumbnails_endpoint/v1/thumbs";
  thumbnails$:Observable<GalleryThumb[]>;

   constructor(private http: HttpClient) {
    this.storeThumbnails();
   }

   storeThumbnails(){
     this.thumbnails$ = this.getThumbnails();
   }

  getThumbnails():Observable<GalleryThumb[]>{
    return this.http.get<GalleryThumb[]>(this.galleriesUrl )
  .pipe(

    shareReplay(1)

  )
  }
}
