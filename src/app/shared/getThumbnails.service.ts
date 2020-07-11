import {
  Injectable
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetThumbnailsService {
 // private galleriesUrl = "http://localhost:8888/wordpress/index.php/wp-json/bens_custom_endpoint/v1/getThumbnails";
   private galleriesUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/bens_custom_endpoint/v1/getThumbnails";
  galleries$ = this.http.get(this.galleriesUrl)
  .pipe(
    shareReplay(1)
  )
  constructor(private http: HttpClient) {
  }
}
