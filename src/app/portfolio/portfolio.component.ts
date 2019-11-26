import {
  Component,
  OnInit
} from '@angular/core';
import {
  WpRESTmoduleService
} from '../shared/wp_rest_module.service';

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})


export class PortfolioComponent implements OnInit {
  galleries: any
  pictures: any

  constructor(private wpREST: WpRESTmoduleService) {}

  ngOnInit(): void {
    this.wpREST.getGalleries().subscribe({
        next: galleries => {
          this.galleries = galleries
        }
    })

    }
  };
