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
  preloadImage: any;
  preloadDiv: HTMLDivElement;
  index: number;
  previousScrollValue: Object;
  thumbnailsAllLoaded: any;

  constructor(private route: ActivatedRoute, private preloadPics: GetPreloadPicsService,) {}

  ngOnInit(): void {

      this.thumbnails = this.route.snapshot.data["thumbnails"];
      this.preloadDiv = document.createElement("div");
      this.thumbnails.forEach((item,index )=> {
        item.showFlag = false;
        this.preloadImage = new Image;
        this.preloadImage.id = "pic" + index;
        this.preloadDiv.appendChild(this.preloadImage);
      })
      //  // subscribe to get four pics per gallery
      this.thumbnails.forEach((thumbnail) => {
        thumbnail.obs$ = this.preloadPics.getFirstFourPics(thumbnail.slug).subscribe(
          array => {
            thumbnail.fourPics = array;
            thumbnail.done = true;
          }
        );
      })
    };


    hover(event) {
      this.hoverEventObject = event;
    };

    onScroll(event) {
      sessionStorage.setItem("scroll",
        event.srcElement.scrollTop,
      )
    }

    ngAfterViewInit(){
      this.loadLoop(0);
      if (sessionStorage.getItem('scroll')) {
        console.log(sessionStorage.getItem('scroll'))
        this.previousScrollValue = sessionStorage.getItem('scroll')
      };
    }

    loadLoop(counter): void {
      //break out if no more images
      if (counter === this.thumbnails.length) {
        this.thumbnailsAllLoaded = true;


        return
      }
      //grab an image object
      let img = < HTMLImageElement > this.preloadDiv.querySelector("#pic" + counter);
      this.thumbnails[counter].loadedUrl = this.thumbnails[counter].url
      img.onload = () => {
        this.thumbnails[counter].showFlag = true;
        this.loadLoop(counter + 1)
      }
      //load image
     img.src = this.thumbnails[counter].url;
    }


  }
