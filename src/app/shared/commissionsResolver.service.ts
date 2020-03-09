import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { GetCommissionsService } from './get-commissions.service'

@Injectable({
  providedIn: 'root'
})

export class CommissionsResolverService implements Resolve<any>{
  constructor(private commissions:GetCommissionsService) { }
    resolve() {
      return this.commissions.commissions$;
    }
}

