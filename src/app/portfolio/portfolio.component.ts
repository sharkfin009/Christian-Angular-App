import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

import {
  GetThumbnailsService
} from "../shared/getThumbnails.service"

import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import {
  GetPreloadPicsService
} from '../shared/getPreloadPics.service';
import {
  Observable
} from 'rxjs';


@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],

})

export class PortfolioComponent implements OnInit {
  thumbnails = [];
  hoverEventObject = {
    hover: "",
    title: '',
    names: "",
  };
  @Output() arrowClass = new EventEmitter();


  previousScrollValue: Object;
  thumbnailsAllLoaded: any;

  constructor(private route: ActivatedRoute, private preloadPics: GetPreloadPicsService, private thumbnailsService: GetThumbnailsService) {}

  ngOnInit(): void {

    for (let i = 0; i <= 27; i++) {
      this.thumbnails.push("");
    }

  };


  hover(event) {
    this.hoverEventObject = event;
  };

  onScroll(event) {
    sessionStorage.setItem("scroll",
      event.srcElement.scrollTop,
    )
  }

  ngAfterViewInit() {


 let getThumbnail = async(index)=>{
 let thumb = await this.thumbnailsService.getThumbnails().subscribe(thumbnail => {
    console.dir(thumbnail)
  })
 }




    if (!sessionStorage.getItem("firstLoad")) {

    } else {

    }
    if (sessionStorage.getItem('scroll')) {
      setTimeout(() => {
        console.log(sessionStorage.getItem('scroll'))
        this.previousScrollValue = sessionStorage.getItem('scroll')
      })
    };

    // this.thumbnails.forEach((thumbnail) => {
    //   thumbnail.obs$ = this.preloadPics.getFirstFourPics(thumbnail.slug).subscribe();
    // })
  }
}
