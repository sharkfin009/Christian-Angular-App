import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewContainerRef
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
import {
  isNgTemplate
} from '@angular/compiler';
import {
  GalleryThumbnailComponent
} from '../thumbnail/gallery-thumbnail.component';


@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],

})

export class PortfolioComponent implements AfterViewInit {
  @ViewChildren(GalleryThumbnailComponent, {
    read: ViewContainerRef
  }) thumbBoxes: QueryList<ViewContainerRef>;
  thumbnails = [];
  hoverEventObject = {
    hover: "",
    title: '',
    names: "",
  };
  @Output() arrowClass = new EventEmitter();


  previousScrollValue: Object;
  thumbnailsAllLoaded: any;
  elements: any;

  constructor(private route: ActivatedRoute, private preloadPics: GetPreloadPicsService, private thumbnailsService: GetThumbnailsService) {}

  hover(event) {
    this.hoverEventObject = event;
  };

  onScroll(event) {
    sessionStorage.setItem("scroll",
      event.srcElement.scrollTop,
    )
  }

  onload2Promise(obj) {
    return new Promise((resolve, reject) => {
      obj.onload = () => resolve(obj);
      obj.onerror = reject;
    });
  }

  ngAfterViewInit() {
    this.thumbnailsService.getThumbnails().subscribe(thumbs => {
      thumbs.forEach((item, index) => {
        item.count = `number-${index}`;
      })

      this.thumbnails = thumbs;
      this.thumbBoxes.changes.subscribe(item => {
        this.elements=item.toArray();
        orchestrate(thumbs);
       });
    });

    let orchestrate = async (thumbs) => {

      this.thumbnails.forEach((item, index) => {
        let thumbClass = `.number-${index}`;
        let img = this.elements[index]._data.renderElement.children[0].children[0];
         item.img = img;
         let imgPromise = this.onload2Promise(img);
         item.imgPromise = imgPromise;
      });
      console.dir(this.thumbnails);
      let recursive = (count) => {
        this.thumbnails[count].img.src = this.thumbnails[count].url;
        this.thumbnails[count].imgPromise.then(data => {
          this.thumbnails[count].img.style.opacity = "1";
          count++;
          recursive(count);
         })
      }
      recursive(0);
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

    this.thumbnails.forEach((thumbnail) => {
      thumbnail.obs$ = this.preloadPics.getFirstFourPics(thumbnail.slug).subscribe();
    })
  }
}
