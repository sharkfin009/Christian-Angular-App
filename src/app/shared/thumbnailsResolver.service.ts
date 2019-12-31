import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { GetThumbnailsService } from './getThumbnails.service'

@Injectable({
  providedIn: 'root'
})


export class ThumbnailsResolverService implements Resolve<any>{
  constructor(private getThumbnails:GetThumbnailsService) { }

    resolve() {
      return this.getThumbnails.galleries$
    }
}
