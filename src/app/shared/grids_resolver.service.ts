import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { GridCallService } from './grid-call.service'

@Injectable({
  providedIn: 'root'
})


export class GridsResolverService implements Resolve<any>{
  constructor(private grids:GridCallService) { }

    resolve() {
      return this.grids.grids$
    }
}
