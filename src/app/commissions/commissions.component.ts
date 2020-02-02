import { Component, OnInit } from '@angular/core';
import { GetCommissionsService } from '../shared/get-commissions.service';
import { Commission } from '../portfolio/interfaces'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {
commissions$: Observable<any>;



  constructor(private getCommissions:GetCommissionsService) { }

  ngOnInit() {
    this.commissions$ = this.getCommissions.commissions$;
  }

}
