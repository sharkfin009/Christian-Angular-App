import {
  Injectable
} from '@angular/core';
import {
  Observable,
  Subject,
  from,
  of,
  pipe
} from 'rxjs';
import {
  map
} from 'rxjs/operators'
import {
  HttpClient,
} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class WpRESTmoduleService {
  public data$ = new Subject;
  cache: any

  private galleriesUrl = "http://localhost:8888/wordpress/index.php/wp-json/bens_custom_endpoint/v1/getPostsWithFeaturedImageLinks";
  // private galleriesUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/bens_custom_endpoint/v1/getPostsWithFeaturedImageLinks";

  constructor(private http: HttpClient) {}

  apiCall() {
    let temp = of (this.http.get(this.galleriesUrl))
    .subscribe(
      (item)=>this.cache=item
    )
    console.log(this.cache)
    return this.cache
  }
}
