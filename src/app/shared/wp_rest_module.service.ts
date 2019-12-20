import {
  Injectable
} from '@angular/core';
import {
  Observable,
  Subject,
  from,
  of ,
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
  galleries: any
  galleriesWithImages: any

  private galleriesUrl = "http://localhost:8888/wordpress/index.php/wp-json/bens_custom_endpoint/v1/getPostsWithFeaturedImageLinks";
  // private galleriesUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/bens_custom_endpoint/v1/getPostsWithFeaturedImageLinks";

  constructor(private http: HttpClient) {
    //this.addImages()
  }

  apiCall() {
    let temp = of (this.http.get(this.galleriesUrl))
      .subscribe({
          next: (item => this.galleries = item),
          error: (item => console.log(`error:${item}`)),
          complete: () => {
            console.log(`get is done`);
          }
        }
      );
    //console.log(this.galleries);
    return this.galleries
  }

  addImages() {
    let q;
   this.galleries.forEach((item) => {
      let gridLoaded = document.createElement('div');
      gridLoaded.innerHTML = item.grid;
      item.imageCache = gridLoaded;
    });
    console.log(this.galleries);
    return q;

  }
}
