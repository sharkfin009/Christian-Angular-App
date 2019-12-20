import {
  Component,
  OnInit,
  Output
} from '@angular/core';
import {
  WpRESTmoduleService
} from '../shared/wp_rest_module.service';
import {
  ActivatedRoute
} from '@angular/router';
import { of } from "rxjs"

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  public galleries: any



  constructor(private wpREST: WpRESTmoduleService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.galleries = this.route.snapshot.data['galleries']
    let obs= of(this.addImages());
    obs.subscribe({
      next:(item)=>{},
      error:(item)=>{},
      complete:()=>console.log('done')
      });
  };

  addImages() {
    let q;
  let mixin =  this.galleries.forEach((item) => {
        let gridLoaded = document.createElement('div');
        gridLoaded.innerHTML = item.grid;
        item.imageCache = gridLoaded;
      });
    return q;
    }
  }
