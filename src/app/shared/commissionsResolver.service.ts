import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { GetCommissionsService } from './get-commissions.service'

@Injectable({
  providedIn: 'root'
})

export class CommissionsResolverService implements Resolve<any>{
  constructor(private commissions:GetCommissionsService) { }
    resolve(route: ActivatedRouteSnapshot) {
        return this.commissions.getCommissionsThumbnailLayout();
    }
}

