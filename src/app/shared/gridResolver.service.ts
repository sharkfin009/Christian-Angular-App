  import {
    Injectable
  } from '@angular/core';
  import {
    Resolve,
    ActivatedRouteSnapshot
  } from '@angular/router'
  import {
    GetGridService
  } from './getGrid.service'

  @Injectable({
    providedIn: 'root'
  })


  export class GridResolverService implements Resolve < any > {
    constructor(private grid: GetGridService) {}

    resolve(route: ActivatedRouteSnapshot) {
      return this.grid.getGrid(
        route.data.view,
        route.paramMap.get("slug"));
    }
  }
