import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { GetCommissionService } from './get-commission.service';

@Injectable({
  providedIn: 'root'
})

export class CommissionResolverService implements Resolve<any>{
  constructor(private commission:GetCommissionService) { }
    resolve(route: ActivatedRouteSnapshot) {
       return this.commission.getCommission(route.paramMap.get("slug"));
    }
}

