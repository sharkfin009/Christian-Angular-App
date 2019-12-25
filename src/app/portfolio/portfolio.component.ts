import {
  Component,
  OnInit,
  Output
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import { GridCallService } from "../shared/grid-call.service"
import { of } from 'rxjs';


@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  preload$ = this.gridz.grids$.subscribe({next:(item=>item)})

  public galleries: any;
  errorMessage = '';

  constructor( private route: ActivatedRoute, private gridz:GridCallService) {}

  ngOnInit(): void {
    this.galleries = this.route.snapshot.data['galleries'];
  };
  }
