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


@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],

  }

) export class GalleryComponent implements OnInit {
  defaultImaj = 'https://www.placecage.com/1000/1000';
  one = "https://source.unsplash.com/user/erondu";
  two = "https://source.unsplash.com/Gkc_xM3VY34/1600X900";
  three = "https://source.unsplash.com/JYvWlLREwBk/1600X900";
  four = "https://source.unsplash.com/d9KHXXjJR54/1600X900";
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

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }

  ngOnInit(): void {
    //set up values
    this.gallery = this.route.snapshot.data['gallery'];
    this.srcUrls = this.gallery.srcUrls;
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.gallery.grid);
    //prep preload array
    for (let i = 0; i < 3; i++) {
      this.preloads.push(this.srcUrls[i]);
    }
  }

  ngAfterViewInit() {
    //set up DOM values
    this.body = document.querySelector("body");
    this.lightbox = document.querySelector('#lightbox');
    this.galleryGrid = document.querySelector('#galleryGrid');
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
    this.preloadDiv = document.querySelector("#preloadDiv");
    //make Array of img's
    this.picsArray = this.galleryGrid.querySelectorAll('img');
    this.arrowFrame = document.querySelector(".arrow-frame");

    //add click listeners to overlay
    this.left.addEventListener("click", this.browseLeft.bind(this), false);
    this.right.addEventListener("click", this.browseRight.bind(this), false);
    //add key listeners
    let callBrowse = function (e) {
      if (e.code === "ArrowLeft") {
        this.browseLeft();
      };
      if (e.code === "ArrowRight")
        this.browseRight().bind(this);
      if (e.code === "Escape")
        this.closeLightbox();
    }
    document.addEventListener('keydown', callBrowse.bind(this));

    this.preloadDiv.addEventListener("load", this.afterLoadFew.bind(this), true);
  }
  afterLoadFew() {

    this.picsArray.forEach((item, index) => {
      //   load all pics
      item.src = this.srcUrls[index];
      //place index in data att
      item.setAttribute("data-id", index);
      //set lightbox listener
      item.addEventListener("click", this.showLightbox.bind(this), true);
      this.galleryWrapper.onscroll = function(){
      console.log('yup');
        this.arrowFrame.style.opacity=0;
      }.bind(this)n


      //fade in above fold pics when loaded, and set flag to differentiate first screenfull
      let picTop = item.getBoundingClientRect().top;
      if (picTop < window.innerHeight) {
        item.onload = function () {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        };
        item.noFloat = true;
      }
      //hide below fold pics for floating in
      else if (picTop > window.innerHeight) {
        item.src = this.srcUrls[index];
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
    });
  }
  intersectionCallback(entries) {
    entries.forEach(entry => {
      let picTop = entry.boundingClientRect.top;
      // animate pics on entry and exit (if loaded)
      if (entry.target.noFloat === false) {
        if (picTop < window.innerHeight && entry.target.complete === true) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = 'translateY(0)';
        }
        if (picTop > window.innerHeight) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = 'translateY(300px)';
        }
      }
    });
  }

  showLightbox(event) {
    this.lightboxFlag = true;
    this.headerClass.emit("o-0");
    this.picPointer = parseInt(event.target.dataset.id);

    this.picZoom(event.target);
    //show lightbox after transition to hide galleryGrid
    setTimeout(() => {
      this.lightbox.style.opacity = '1';
      this.overlay.style.zIndex = "300";
      this.lightbox.style.zIndex = "200";
      this.galleryGrid.classList.remove("gridFadeOut");
      void this.galleryGrid.offsetWidth;
      this.galleryGrid.classList.add("gridFadeOut");
      this.galleryGrid.style.opacity = 0;

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
      // this.previous.srcset = this.srcUrls[this.picPointer - 1].srcset;
    }
    if (this.picPointer < this.picsArray.length - 2) {
      this.next.src = this.picsArray[this.picPointer + 1].src;
      // this.next.srcset = this.srcUrls[this.picPointer + 1].src;
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
    this.galleryGrid.style.transformOrigin = `${this.photoCenterWithinGrid.x}px ${this.photoCenterWithinGrid.y}px`;

    // work out  middle Y value for target
    let targetMiddleY = window.innerHeight / 2 - targetHeight / 2;

    //work out translate values for zoomed position
    let diffX = window.innerWidth / 2 - photoMiddleX;
    let diffY = window.innerHeight / 2 - photoMiddleY;

    // do translates
    this.galleryGrid.style.transform = `translateX(${diffX}px`;
    this.galleryGrid.style.transform += `translateY(${diffY + this.galleryWrapper.scrollTop}px)`;

    //do scale

    this.galleryGrid.style.transform += `scale(${zoomRatio})`;



  }

  browseLeft(e) {
    if (this.lightboxFlag) {
      //assign next pic
      if (this.picPointer > 0) {

        this.picPointer -= 1;

        this.pic.srcset = this.picsArray[this.picPointer].srcset;
        this.pic.src = this.picsArray[this.picPointer].src;
        this.galleryGrid.style.transform = "none";
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
        this.galleryGrid.style.transform = "none";
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
    this.galleryGrid.style.opacity = 1;


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
    this.galleryGrid.style.transform = "none";


  }

}
