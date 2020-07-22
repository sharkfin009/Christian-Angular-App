    import {
  Injectable
} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router'

import { GetThumbnailsService } from './getThumbnails.service';

@Injectable({
  providedIn: 'root'
})


export class ThumbnailsResolverService implements Resolve < any > {
  constructor(private thumbnails: GetThumbnailsService) {}
  resolve(route: ActivatedRouteSnapshot) {
   {
      return this.thumbnails.getThumbnails();
    }

  }
}
