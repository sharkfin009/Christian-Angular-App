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
import {
  isNgTemplate
} from '@angular/compiler';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';


@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],
    animations: [
      trigger('scrollFadeHide', [

        transition('*=>fire', [
          animate('0.7s ease-out',
            keyframes([
              style({
                opacity: "1",
                offset: 0
              }),
              style({
                opacity: "0",
                offset: 1.0
              })
            ]))
        ]),

      ]),
      trigger('scrollFadeHide2', [

        transition('*=>fire', [
          animate('0.7s ease-out',
            keyframes([
              style({
                opacity: "1",
                offset: 0
              }),
              style({
                opacity: "0",
                offset: 1.0
              })
            ]))
        ]),

      ]),
      trigger('scrollFadeIn', [

        transition('*=>fire', [
          animate('1s ease-out',
            keyframes([
              style({
                opacity: "0",
                offset: 0
              }),
              style({
                opacity: "1",
                offset: 1.0
              })
            ]))
        ]),

      ]),
    ]


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
  leftPic: any;
  activeRouteTitle: any;
  srcSetUrls: any;
  srcUrls: any;
  preloads = [];
  preloadDiv: any;
  arrowFrame: any;
  flag = false;
  exp: any;
  renderedGrid: any;
  scrollFadeFlag = true;
  rightPic: any;
  fadeFlag = "reload";
  fader: any;
  faderB: any;
  crossFadeDone = false;
  fadeFlag2 = "reload";
  crossFadeDone2 = false;
  yOffset: any;
  clickBlock: Boolean;
  fadeInFlag: string;
  fadeInDone: boolean;
  arrowLeft: string;
  arrowRight: string;
  nonce = 0;
  startFlag = false;
  srcSets= [];


  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }

  ngOnInit(): void {
    //set up values
    this.gallery = this.route.snapshot.data['gallery'];
    this.srcUrls = this.gallery.srcUrls;
    this.srcSets = this.gallery.srcSets;
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.gallery.grid);
    console.dir(this.srcUrls);
    console.dir(this.gallery)

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
    this.close = document.querySelector("#close");
    this.leftPic = document.querySelector("#leftPic");
    this.rightPic = document.querySelector("#rightPic");
    this.fader = document.querySelector("#fader");
    this.faderB = document.querySelector("#faderB");

    // this.preloadDiv = document.querySelector("#preloadDiv");

    //add click listeners to overlay
    this.left.addEventListener("click", this.browse.bind(this), false);
    this.left.direction = "left";
    console.dir(this.left)
    this.right.addEventListener("click", this.browse.bind(this), false);
    this.right.direction = "right";

    //add key listeners
    let callBrowse = function (e) {
      if (e.code === "ArrowLeft") {
        this.browse("left");
      };

      if (e.code === "ArrowRight")
        this.browse("right");

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
     this.picsArray[0].src = this.picsArray[0].dataset.src;
  //  this.picsArray[0].srcset = this.srcSets[0];
    //place load events on preload div to trigger anim according to position
  }

  scrollToTop(): void {
    console.log("yip")
    this.galleryWrapper.scrollTo(0,0)
  }

  picsListenLoadAndObserve() {
    this.picsArray.forEach((item, index) => {
      item.onload = function () {
        //fade in above fold pics , and set flag to differentiate first screenfull
        let picTop = item.getBoundingClientRect().top;
        if (picTop < window.innerHeight) {
          item.style.opacity = "1";
          item.transform = "translateY(300)";
        }
        //hide below fold pics for floating in
        else if (picTop > window.innerHeight) {
          item.noFloat = false;
          item.style.opacity = "0";
          item.style.transform = 'translateY(0px)';
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
      if (index !== 0) {
        item.src = item.dataset.src;
      //  item.src = this.srcUrls[index];
    // item.srcset = this.srcSets[index]
      }
      //place index in data att
      item.setAttribute("data-id", index);
      //set lightbox listener
      item.addEventListener("click", this.showLightbox.bind(this), true);


    });
  }

  intersectionCallback(entries) {
    entries.forEach((entry, index) => {

      let picTop = entry.boundingClientRect.top;

      // animate pics on entry and exit (if loaded)
      if (picTop < window.innerHeight) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = 'translateY(0)';
      }
      if (picTop > window.innerHeight) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = `translateY(300px)`;
      }
    });
  }

  showLightbox(event) {
    this.clickBlock = true;
    this.lightboxFlag = true;
    this.headerClass.emit("o-0");
    this.picPointer = parseInt(event.target.dataset.id);

    //hide arrows at start and end of pics
    if (this.picPointer === 0) {
      this.arrowLeft = "o-0";
    } else {
      this.arrowLeft = "o-100";
    }
    if (this.picPointer === this.picsArray.length - 1) {
      this.arrowRight = "o-0";
    } else {
      this.arrowRight = "o-100";
    }

    this.picZoom(event.target);
    //show lightbox after transition to hide renderedGrid
    setTimeout(() => {
      this.arrowFrame.style.opacity = 0;
      this.lightbox.style.transition = "opacity 0.05s";
      this.lightbox.style.opacity = '1';
      this.overlay.style.zIndex = "300";
      this.lightbox.style.zIndex = "200";
      // this.renderedGrid.classList.remove("gridFadeOut");
      void this.renderedGrid.offsetWidth;
      // this.renderedGrid.classList.add("gridFadeOut");
      this.renderedGrid.style.transition = "opacity 0.3s"
      this.renderedGrid.style.opacity = 0;
      this.clickBlock = false;
    }, 300)

    //put this pic in lightbox
    this.pic.src = this.srcUrls[this.picPointer];
     this.pic.srcset = this.srcSets[this.picPointer];

    //set width of close,left and right elements
    this.close.style.width = this.pic.offsetWidth + "px";
    let sideWidth = (window.innerWidth - this.pic.offsetWidth) / 2;
    this.left.style.width = sideWidth + "px";
    this.right.style.width = sideWidth + "px";



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
    //get absolute photo position
    let photoUnzoomed = this.cumulativeOffset(photo, 8);

    //check transform values set in layGridder
    let yOffsetPerc = photo.parentElement.parentElement.dataset.offsety;
    let xOffsetPerc = photo.parentElement.parentElement.dataset.offsetx;
    this.yOffset = () => {
      if (yOffsetPerc) {
        let yOffset = window.innerWidth * yOffsetPerc / 100;
        return yOffset;
      } else return 0;
    }
    let xOffset = () => {
      if (xOffsetPerc) {
        let xOffset = window.innerWidth * xOffsetPerc / 100;
        return xOffset;
      } else return 0;
    }
    //work out 90% height and resultant width
    let aspectRatio = photo.width / photo.height;
    let targetHeight = window.innerHeight * 0.9;
    let targetWidth = targetHeight * aspectRatio;

    //work out zoom ratio
    let zoomRatio = targetWidth / photo.offsetWidth;

    //work out photo center
    let photoMiddleX = photoUnzoomed.left + photo.offsetWidth / 2 + xOffset();
    let photoMiddleY = photoUnzoomed.top + photo.offsetHeight / 2 + this.yOffset();

    //get photo position within grid for transform origin , so that zoom animation is correct
    this.photoCenterWithinGrid = {
      x: this.cumulativeOffset(photo, 5).left + photo.offsetWidth / 2 + xOffset(),
      y: this.cumulativeOffset(photo, 5).top + photo.offsetHeight / 2 + this.yOffset() - 250,
    }
    // set transform origin
    this.renderedGrid.style.transformOrigin = `${this.photoCenterWithinGrid.x}px ${this.photoCenterWithinGrid.y}px`;

    // work out  middle Y value for target
    //let targetMiddleY = window.innerHeight / 2 - targetHeight / 2;

    //work out translate values for zoomed position
    let diffX = window.innerWidth / 2 - photoMiddleX;
    let diffY = window.innerHeight / 2 - photoMiddleY;

    // do translates
    this.renderedGrid.style.transform = `translateX(${diffX}px`;
    this.renderedGrid.style.transform += `translateY(${diffY + this.galleryWrapper.scrollTop}px)`;

    //do scale

    this.renderedGrid.style.transform += `scale(${zoomRatio})`;


  }

  resetScrollFade() {
    console.log("reset 1")
    this.fadeFlag = "reload";
    this.crossFadeDone = true;
  }
  resetScrollFade2() {
    console.log("reset 2")
    this.fadeFlag2 = "reload";
    this.crossFadeDone2 = true;

  }
  resetScrollFadeIn() {
    this.fadeInFlag = "reload";

  }


  browse(param) {
    //establish direction
    let direction = "";

    if (typeof (param) === "string") {
      direction = param;
    };

    if (param.target) {
      direction = param.target.direction
    }
     //close lightbox at start
     if (direction === "left" && this.picPointer === 0) {
      this.closeLightbox();
    }

    //close lightbox at end
    if (direction === "right" && this.picPointer === this.picsArray.length - 1) {
      this.closeLightbox();
    }

    // check lightbox flag and range for whole function
    if (this.lightboxFlag &&
      this.picPointer <= this.picsArray.length - 1 &&
      this.picPointer >= 0) {

      //adjust pointer with direction
      if (direction === "left" && this.picPointer > 0) {
        this.picPointer -= 1;
      }
      if (direction === "right" && this.picPointer < this.picsArray.length - 1) {
        this.picPointer += 1;
      }
      console.log("direction:", direction)
      console.log("picPointer:", this.picPointer);
      console.log("crossfadeDone=",this.crossFadeDone);
      console.log("crossfadeDone2=",this.crossFadeDone2)
      //update pic
      this.pic.src = this.picsArray[this.picPointer].src;
      this.pic.srcset = this.srcSets[this.picPointer];

        // if scroll is fired before last scroll fade anim is finished, fire the backup fade anim
       // check range again
       if (!this.crossFadeDone && this.crossFadeDone2 && this.picPointer < this.picsArray.length - 1 &&
        this.picPointer >= 0) {
        console.log('fire 2')

        if (this.picPointer === 0) {
          this.startFlag = true;
        }
        //check direction and put previous pic in front to fade out according to direction
        if (direction === "right") {
          //manage first pic
          this.startFlag = false;
          this.nonce = 0;
          //move right with animation
           this.faderB.src = this.picsArray[this.picPointer - 1].src;
          // this.faderB.srcset = this.srcSets[this.picPointer -1];
          this.fadeFlag2 = "fire";
          this.crossFadeDone2 = false;
        }
        if (direction === "left") {
          let moveLeft = () => {
             this.faderB.src = this.picsArray[this.picPointer + 1].src;
            // this.faderB.srcset = this.srcSets[this.picPointer +1];
            this.fadeFlag2 = "fire";
            this.crossFadeDone2 = false;
            this.nonce++;
          }

          //manage first pic
          if (this.startFlag === true && this.nonce === 0) {
            this.nonce++;
            moveLeft()
          }
          if (this.startFlag === false) {
            moveLeft()
          }
        }
        this.fadeFlag2 = "fire";
        this.crossFadeDone2 = false;
      }

     //check if 1st fade is done and range should be allowed
      if (this.crossFadeDone && this.picPointer < this.picsArray.length - 1 &&
        this.picPointer >= 0) {
          console.log('fire 1')
        if (this.picPointer === 0) {
          this.startFlag = true;
        }
        //check direction and put previous pic in front to fade out according to direction
        if (direction === "right") {
          //manage first pic
          this.startFlag = false;
          this.nonce = 0;
          //move right with animation
          this.fader.src = this.picsArray[this.picPointer - 1].src;
          this.fadeFlag = "fire";
          this.crossFadeDone = false;
        }
        if (direction === "left") {
          let moveLeft = () => {
            this.fader.src = this.picsArray[this.picPointer + 1].src;
            this.fadeFlag = "fire";
            this.crossFadeDone = false;
            this.nonce++;
          }

          //manage first pic
          if (this.startFlag === true && this.nonce === 0) {
            this.nonce++;
            moveLeft()
          }
          if (this.startFlag === false) {
            moveLeft()
          }
        }
      }



      //adjust invisible grid according to scroll;

      this.renderedGrid.style.transition = "none";
      this.renderedGrid.style.transform = "none";

      let photo = document.querySelector(`[data-id="${this.picPointer}"]`)

      let scrollAmount = this.cumulativeOffset(photo, 8).top + photo.clientHeight / 2 - this.galleryWrapper.clientHeight / 2;
      this.galleryWrapper.scrollTo(0, scrollAmount);
      this.picZoom(photo);

      if (this.picPointer === 0) {
        this.arrowLeft = "o-0";
      } else {
        this.arrowLeft = "o-100";
      }
      if (this.picPointer === this.picsArray.length - 1) {
        this.arrowRight = "o-0";
      } else {
        this.arrowRight = "o-100";
      }


    }
  }


  // browseRight() {
  //   if (this.crossFadeDone) {

  //     this.fader.src = this.picsArray[this.picPointer].src;
  //   }

  //   if (this.picPointer > 2) {

  //     this.faderB.src = this.picsArray[this.picPointer - 2].src;
  //   }


  //   //assign next pic
  //   if (this.picPointer <= this.picsArray.length - 2) {
  //     this.picPointer += 1;
  //     //store old pic width
  //     let oldWidth = this.pic.offsetWidth;
  //     this.pic.srcset = this.picsArray[this.picPointer].srcset;
  //     this.pic.src = this.picsArray[this.picPointer].src;



  //     //if scroll is fired before last scroll fade anim is finished, fire the backup fade anim
  //     if (!this.crossFadeDone) {
  //       this.pic.style.transition = "none";
  //       this.pic.style.opacity = 0;
  //       this.pic.style.transition = "opacity 0.7s ease-out";
  //       this.pic.style.opacity = 1;


  //       this.fadeFlag2 = "fire";
  //       this.crossFadeDone2 = false;
  //     }

  //     // fade out old

  //     this.fadeFlag = "fire";
  //     this.crossFadeDone = false;

  //     //adjust invisible grid according to scroll
  //     this.renderedGrid.style.transition = "none";
  //     this.renderedGrid.style.transform = "none";
  //     let photo = document.querySelector(`[data-id="${this.picPointer}"]`)

  //     let scrollAmount = this.cumulativeOffset(photo, 8).top + photo.clientHeight / 2 - this.galleryWrapper.clientHeight / 2;
  //     this.galleryWrapper.scrollTo(0, scrollAmount);
  //     this.picZoom(photo);
  //   }
  //   console.log(this.picPointer)

  //   if (this.picPointer === this.picsArray.length) {
  //     this.arrowRight = "o-0";
  //   } else {
  //     this.arrowRight = "o-100";
  //   }

  // }

  closeLightbox() {
    if (this.clickBlock === true) {
      console.log("catch")
      return;
    }
    //show grid
    this.renderedGrid.style.transition = "none";
    this.renderedGrid.style.opacity = 1;
    this.renderedGrid.style.transition = "transform 0.3s ease-out";
    this.renderedGrid.style.transform = "none";
    //switch flag
    this.lightboxFlag = false;
    //emit class to hide header
    this.headerClass.emit('o-100')



    // hide lightbox
    this.lightbox.style.transition = "opacity 0.1s"
    this.lightbox.style.opacity = "0";
    this.lightbox.style.zIndex = "-1";
    //put overlay behind so we can click on pics again
    this.overlay.style.zIndex = "-1"
    //remove hover classes

    let photo = < any > document.querySelector(`[data-id="${this.picPointer}"]`);
    photo.style.transition = "none";
    photo.style.opacity = "1";
    photo.style.transform = "none";



  }

}
