import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { WpRESTmoduleService } from './wp_rest_module.service'

@Injectable({
  providedIn: 'root'
})


export class GalleriesResolverService implements Resolve<any>{
  constructor(private wpREST:WpRESTmoduleService) { }

    resolve() {
      return this.wpREST.galleries$
    }
}
