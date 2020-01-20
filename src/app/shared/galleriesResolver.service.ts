import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { GetGalleriesService } from './getGalleries.service'

@Injectable({
  providedIn: 'root'
})


export class GalleriesResolverService implements Resolve<any>{
  constructor(private galleries:GetGalleriesService) { }

    resolve() {
      return this.galleries.galleries$;
    }
}
