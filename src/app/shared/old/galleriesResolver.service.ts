  import {
  Injectable
} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router'
import {
  GetGalleriesService
} from './getGalleries.service'

@Injectable({
  providedIn: 'root'
})


export class GalleriesResolverService implements Resolve < any > {
  constructor(private galleries: GetGalleriesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    if (route.paramMap.get("slug") !== null) {
      return this.galleries.getGallery(
        route.paramMap.get("slug"));
    } else  {
      console.log(route)
      return this.galleries.getGallery("showcase");
    }
  }
}
