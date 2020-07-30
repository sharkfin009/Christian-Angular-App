  import {
  Injectable
} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router'
import {
  GetAboutService
} from './getAbout.service'

@Injectable({
  providedIn: 'root'
})


export class AboutResolverService implements Resolve < any > {
  constructor(private getAbout: GetAboutService) {}

  resolve(route: ActivatedRouteSnapshot) {
   
      return this.getAbout.getAbout();

  }
}
