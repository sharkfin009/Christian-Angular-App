import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  GetGalleriesService
} from "../shared/getGalleries.service"


@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  preload$ = this.galleries.galleries$.subscribe({
    next: (item => item)
  })
  errorMessage = '';

  constructor(private route: ActivatedRoute, public  galleries: GetGalleriesService) {}

  ngOnInit(): void {
    this.galleries = this.route.snapshot.data['galleries'];
  };
}
