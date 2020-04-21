import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
}

from '@angular/core';

import {
  DomSanitizer,
  SafeHtml,
}

from '@angular/platform-browser'

import {
  RouterOutlet,
  Router,
  RoutesRecognized,
  ActivatedRoute,
}

from '@angular/router';



import {
  map,
  shareReplay,
  timeout,
}

from 'rxjs/operators';

import {
  Observable
}

from 'rxjs';
import {
  doesNotThrow
} from 'assert';
import {
  Gallery
} from '../shared/interfaces';
import { isNgTemplate } from '@angular/compiler';


@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],

  }

) export class GalleryComponent implements OnInit {

  gallery: Gallery;
  grid: string;
  slug: string;
  trustedGrid: SafeHtml;
  galleryGrid: any;
  picsArray: any;
  overlay: any;
  pic: any;
  zoom: string;
  lightboxFade: any;
  left: any;
  right: any;
  lightboxFlag: boolean;
  lightboxNavFlag: boolean;
  picPointer: any;
  fullWrapper: any;
  header: any;
  lightbox: any;
  newPic: any;
  outletWrapper: any;
  body: any;
  close: any;
  photo: any;
  @Output() headerClass = new EventEmitter;
  galleryWrapper: any;
  photoCenterWithinGrid: {
    x: number,
    y: number
  };
  next: any;
  previous: any;
  activeRouteTitle: any;
  srcSetUrls: any;
  srcUrls: any;
  preloads = [];
  preloadDiv: any;
  arrowFrame: any;
  flag = false;
  exp: any;
  renderedGrid: any;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }

  ngOnInit(): void {
    //set up values
    this.gallery = this.route.snapshot.data['gallery'];
    this.srcUrls = this.gallery.srcUrls;
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.gallery.grid);
  }

  ngAfterViewInit() {
    //set up DOM values
    this.body = document.querySelector("body");
    this.lightbox = document.querySelector('#lightbox');
    this.lightboxFade = document.querySelector(".lightbox-fade");
    this.overlay = document.querySelector("#overlay");
    this.pic = document.querySelector("#pic");
    this.left = document.querySelector("#left");
    this.right = document.querySelector("#right");
    this.fullWrapper = document.querySelector(".full-wrapper");
    this.galleryWrapper = document.querySelector("#galleryWrapper");
    this.outletWrapper = document.querySelector("#outlet-wrapper");
    this.close = document.querySelector("#close");
    this.previous = document.querySelector("#previous");
    this.next = document.querySelector("#next");

    // this.preloadDiv = document.querySelector("#preloadDiv");

    //add click listeners to overlay
    this.left.addEventListener("click", this.browseLeft.bind(this), false);
    this.right.addEventListener("click", this.browseRight.bind(this), false);
    //add key listeners
    let callBrowse = function (e) {
      if (e.code === "ArrowLeft") {
        this.browseLeft();
      };
      if (e.code === "ArrowRight")
        this.browseRight();
      if (e.code === "Escape")
        this.closeLightbox();
    }
    document.addEventListener('keydown', callBrowse.bind(this));

    //hide arrow on scroll
    this.arrowFrame = document.querySelector(".arrow-frame");
    // add arrow hide listener
    this.galleryWrapper.onscroll = () => {
      this.arrowFrame.style.opacity = 0;
    }

    //target DOM element containing santized grid as innerHTML
    this.renderedGrid = document.querySelector('#renderedGrid');
    // make nodelist of img's within grid
    this.picsArray = this.renderedGrid.querySelectorAll('img');

    //set first pic load event handler
    this.picsArray[0].addEventListener("load", function () {
      this.picsArray[0].style.opacity = 1;
      this.picsArray[0].style.transform = "translateY(0px)";
      this.picsListenLoadAndObserve();
    }.bind(this), true);


    //load first pic
    this.picsArray[0].src=this.picsArray[0].dataset.src;
    //place load events on preload div to trigger anim according to position
  }


  picsListenLoadAndObserve() {
    this.picsArray.forEach((item, index) => {
      item.onload=function(){
           //fade in above fold pics , and set flag to differentiate first screenfull
      let picTop = item.getBoundingClientRect().top;
      if (picTop < window.innerHeight) {
        item.style.opacity = "1";
        item.transform = "translateY(0)";
      }
      //hide below fold pics for floating in
      else if (picTop > window.innerHeight ) {
        item.noFloat = false;
        item.style.opacity = "0";
        item.style.transform = 'translateY(300px)';
      }
      //set up intersection observer options
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }

      //set up intersection observers
      let observer = new IntersectionObserver(this.intersectionCallback.bind(this), options);
      observer.observe(item);
      }.bind(this)
      if (index!==0){
        item.src= item.dataset.src;
      }
      //place index in data att
        item.setAttribute("data-id", index);
        //set lightbox listener
        item.addEventListener("click", this.showLightbox.bind(this), true);


    });
  }

  intersectionCallback(entries) {
    entries.forEach((entry,index) => {

      let picTop = entry.boundingClientRect.top;

      // animate pics on entry and exit (if loaded)
        if (picTop < window.innerHeight) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = 'translateY(0)';
        }
        if (picTop > window.innerHeight) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = 'translateY(300px)';
        }
    });
  }

  showLightbox(event) {
    this.lightboxFlag = true;
    this.headerClass.emit("o-0");
    this.picPointer = parseInt(event.target.dataset.id);

    this.picZoom(event.target);
    //show lightbox after transition to hide renderedGrid
    setTimeout(() => {
      this.arrowFrame.style.opacity = 0;
      this.lightbox.style.opacity = '1';
      this.overlay.style.zIndex = "300";
      this.lightbox.style.zIndex = "200";
      this.renderedGrid.classList.remove("gridFadeOut");
      void this.renderedGrid.offsetWidth;
      this.renderedGrid.classList.add("gridFadeOut");
      this.renderedGrid.style.opacity = 0;
    }, 300)

    //put this pic in lightbox
    this.pic.src = this.srcUrls[this.picPointer];

    //set width of close,left and right elements
    this.close.style.width = this.pic.offsetWidth + "px";
    let sideWidth = (window.innerWidth - this.pic.offsetWidth) / 2;
    this.left.style.width = sideWidth + "px";
    this.right.style.width = sideWidth + "px";


    //prepare next and previous elements
    if (this.picPointer > 1) {
      this.previous.src = this.srcUrls[this.picPointer - 1].src;
    }
    if (this.picPointer < this.picsArray.length - 2) {
      this.next.src = this.picsArray[this.picPointer + 1].src;
    }
  }
  cumulativeOffset(element, index) {
    let top = 0,
      left = 0,
      i = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
      i++;
    } while (i < index);
    return {
      left: left,
      top: top,
    };
  }
  picZoom(photo) {
    let photoUnzoomed = this.cumulativeOffset(photo, 8);
    // add class to prevent fade
    photo.classList.add("noFade");

    //work out 80% height and resultant width
    let aspectRatio = photo.width / photo.height;
    let targetHeight = window.innerHeight * 0.8;
    let targetWidth = targetHeight * aspectRatio;

    //work out zoom ratio
    let zoomRatio = targetWidth / photo.offsetWidth;

    //work out photo center
    let photoMiddleX = photoUnzoomed.left + photo.offsetWidth / 2;
    let photoMiddleY = photoUnzoomed.top + photo.offsetHeight / 2;
    this.photoCenterWithinGrid = {
      x: this.cumulativeOffset(photo, 5).left + photo.offsetWidth / 2,
      y: this.cumulativeOffset(photo, 5).top + photo.offsetHeight / 2
    }
    // set transform origin
    this.renderedGrid.style.transformOrigin = `${this.photoCenterWithinGrid.x}px ${this.photoCenterWithinGrid.y}px`;

    // work out  middle Y value for target
    let targetMiddleY = window.innerHeight / 2 - targetHeight / 2;

    //work out translate values for zoomed position
    let diffX = window.innerWidth / 2 - photoMiddleX;
    let diffY = window.innerHeight / 2 - photoMiddleY;

    // do translates
    this.renderedGrid.style.transform = `translateX(${diffX}px`;
    this.renderedGrid.style.transform += `translateY(${diffY + this.galleryWrapper.scrollTop}px)`;

    //do scale

    this.renderedGrid.style.transform += `scale(${zoomRatio})`;



  }

  browseLeft(e) {
    if (this.lightboxFlag) {
      //assign next pic
      if (this.picPointer > 0) {

        this.picPointer -= 1;

        this.pic.srcset = this.picsArray[this.picPointer].srcset;
        this.pic.src = this.picsArray[this.picPointer].src;
        this.renderedGrid.style.transform = "none";
        let photo = document.querySelector(`[data-id="${this.picPointer}"]`)

        let scrollAmount = this.cumulativeOffset(photo, 5).top + photo.clientHeight / 2 - this.galleryWrapper.clientHeight / 2;;
        this.galleryWrapper.scrollTo(0, scrollAmount);
        this.picZoom(photo);

        // set up 'previous'
        if (this.picPointer > 0) {
          this.previous.src = this.picsArray[this.picPointer - 1].src;
          this.previous.srcset = this.picsArray[this.picPointer - 1].srcset;
        }

        // set up 'next'
        this.next.src = this.picsArray[this.picPointer + 1].src;
        this.next.srcset = this.picsArray[this.picPointer + 1].srcset;
        //fade out old
        this.next.classList.remove("picFadeOut");
        void this.next.offsetWidth;
        this.next.classList.add("picFadeOut");
        this.next.style.opacity = "0";
      };
    }
  }

  browseRight(e) {
    if (this.lightboxFlag) {

      //assign next pic
      if (this.picPointer <= this.picsArray.length - 2) {
        this.picPointer += 1;
        this.pic.srcset = this.picsArray[this.picPointer].srcset;
        this.pic.src = this.picsArray[this.picPointer].src;
        this.renderedGrid.style.transform = "none";
        let photo = document.querySelector(`[data-id="${this.picPointer}"]`)

        let scrollAmount = this.cumulativeOffset(photo, 5).top + photo.clientHeight / 2 - this.galleryWrapper.clientHeight / 2;;
        this.galleryWrapper.scrollTo(0, scrollAmount);
        this.picZoom(photo);

        // set up 'previous'

        if (this.picPointer > 0) {
          this.previous.src = this.picsArray[this.picPointer - 1].src;
          this.previous.srcset = this.picsArray[this.picPointer - 1].srcset;
        }

        // fade out old
        this.previous.classList.remove("picFadeOut");
        void this.previous.offsetWidth;
        this.previous.classList.add("picFadeOut");
        this.previous.style.opacity = "0";

        // set up 'next'
        if (this.picPointer <= this.picsArray.length - 2) {

          this.next.src = this.picsArray[this.picPointer + 1].src;
          this.next.srcset = this.picsArray[this.picPointer + 1].srcset;
        }
      };
    }
  }

  closeLightbox(e) {
    //show grid
    this.renderedGrid.style.opacity = 1;


    //switch flag
    this.lightboxFlag = false;
    //emit class to hide header
    this.headerClass.emit('o-100')



    // hide lightbox
    this.lightbox.style.opacity = "0";
    //this.overlay.style.opacity = "0";
    this.lightbox.style.zIndex = "-1";
    //put overlay behind so we can click on pics again
    this.overlay.style.zIndex = "-1"
    //remove hover classes

    //scroll
    let photo = document.querySelector(`[data-id="${this.picPointer}"]`);


    // reset transform
    this.renderedGrid.style.transform = "none";


  }

}
