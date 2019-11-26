import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  catchError,
  tap
} from 'rxjs/operators'
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WpRESTmoduleService {
  private galleriesUrl = "http://localhost:8888/wordpress/index.php/wp-json/bens_custom_endpoint/v1/getPostsWithFeaturedImageLinks";
  constructor(private http: HttpClient) {}
  getGalleries(): Observable < any > {
    return this.http.get(this.galleriesUrl).pipe(
      tap(data => console.dir(data)),
      catchError(this.handleError)
    );
  }
  private handleError(err:HttpErrorResponse) :any{
    console.log(err);

  }

}
