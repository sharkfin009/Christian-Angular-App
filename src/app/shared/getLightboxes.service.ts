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
  Lightbox
} from "../portfolio/interfaces"


@Injectable({
  providedIn: 'root'
})
export class GetLightboxesService {
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/getLightboxes/v1/posts/";
  //private apiUrl = "http://localhost:8888/wordpress/index.php/wp-json/getLightboxes/v1/posts/";
  gallery: string;


  getLightboxes(gallery:string) {
  return this.http.get<Lightbox[]>(this.apiUrl + gallery)
  }

  constructor(private http: HttpClient) {}


}
