import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { GetLightboxesService } from './getLightboxes.service'

@Injectable({
  providedIn: 'root'
})


export class LightboxesResolverService implements Resolve<any>{
  constructor(private getLightboxes:GetLightboxesService) { }

    resolve() {
      return this.getLightboxes.lightboxes$
    }
}
