import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

import {
  GetThumbnailsService
} from "../shared/getThumbnails.service"
import {
  Observable
} from 'rxjs';
 import { GalleryThumb } from '../shared/interfaces';


@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  galleries$: Observable < any[] > ;
  thumbnails$: Observable< GalleryThumb[]>;
  hoverEventObject = {
    hover: "",
    title: '',
    names: "",
  };
  @Output() arrowClass = new EventEmitter();

  constructor(private route: ActivatedRoute, public getThumbnails: GetThumbnailsService){}

  ngOnInit(): void {
    this.thumbnails$ = this.getThumbnails.thumbnails$;
  };

  hover(event) {
    this.hoverEventObject = event;

  };


}
