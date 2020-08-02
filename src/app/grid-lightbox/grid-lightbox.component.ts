import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
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
  Grid
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
import {
  THIS_EXPR
} from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'grid-lightbox',
    templateUrl: './grid-lightbox.component.html',
    styleUrls: ['./grid-lightbox.component.css'],
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

) export class GridLightboxComponent implements OnInit {
  @Input() gridData:any;
  @Input() view: any;
  gallery: Grid;
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
  startFlag = false;
  srcSets = [];
  links: any;
  loadLoopFired = false;
  loadedLightboxPics = [];
  browseBlock: Boolean = true;
  galleryPicsLoaded = 0;
  scrollValue: string;
  userScrollFlag= false;
  showArrows: Boolean =true;

  spinnerCursor: any;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }

  ngOnInit(): void {
    this.srcUrls = this.gridData.srcUrls;
    this.srcSets = this.gridData.srcSets;
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.gridData.grid);
    if(this.view === "about"){
      this.showArrows = false;
    }
  }

  onScroll(event){
    this.galleryWrapper.style.scrollBehavior = "auto";
    if(this.userScrollFlag){
      this.picsArray.forEach(item=>{
        item.style.transition = "opacity ease-out 2s, transform ease-out 1s";
     })
    }

    this.userScrollFlag = true;
    sessionStorage.setItem("scrollValue",event.srcElement.scrollTop);
  }

  ngAfterViewInit() {


    //set up DOM values
    this.body = document.querySelector("body");
    this.lightbox = document.querySelector('#lightbox');
    this.lightboxFade = document.querySelectorAll(".lightbox-fade");
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
    this.spinnerCursor = document.querySelector(".spinner-cursor");

    if(this.view === "showcase" && sessionStorage.getItem("scrollValue") && sessionStorage.getItem("showcaseWhatLink") === "back" ){
      this.userScrollFlag = false;
      setTimeout(()=>{
        this.scrollValue=sessionStorage.getItem("scrollValue");
        this.picsArray.forEach(item=>{
          item.style.transition = "none";
       })
      })
    }


    //add click listeners to overlay
    this.left.addEventListener("click", this.browse.bind(this), false);
    this.left.direction = "left";
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

    //set up cursor spinner for right scroll while still loading gallery pics
    window.addEventListener("mousemove",(e)=>{
      this.spinnerCursor.style.left = e.pageX +"px";
      this.spinnerCursor.style.top = e.pageY + "px";
    })
    this.right.addEventListener("mouseenter",(e)=>{
      this.spinnerCursor.style.opacity = 1;
    });
    this.right.addEventListener("mouseleave",(e)=>{
      this.spinnerCursor.style.opacity = 0;
    })

    //hide arrow on scroll
    this.arrowFrame = document.querySelector(".arrow-frame");
    // add arrow hide listener
    this.galleryWrapper.onscroll = () => {
    this.arrowFrame.style.opacity = 0;
    }

    //target DOM element containing santized grid as innerHTML
    this.renderedGrid = document.querySelector('#renderedGrid');
    // make nodelist of img's within grid
    let picNodeList = this.renderedGrid.querySelectorAll('img');

    this.picsArray = Array.from(picNodeList)


    this.picsArray.forEach((item, index, array) => {
      let src = item.dataset.src.slice(8);
      this.loadedLightboxPics[index] = "https://i0.wp.com/" + src + "?resize=1740&ssl=1";

    })
    //set first pic load event handler
    this.picsArray[0].addEventListener("load", function () {
      this.picsArray[0].style.opacity = 1;
      this.picsArray[0].style.transform = "translateY(0px)";
      this.picsListenLoadAndObserve();
    }.bind(this), true);

    //load first  pic
     this.picsArray[0].src = this.picsArray[0].dataset.src;
    this.picsArray[0].srcset = this.srcSets[0];

  }

  scrollToTop(): void {
    this.galleryWrapper.style.scrollBehavior = "smooth";
    this.galleryWrapper.scrollTo(0, 0)
  }

  picsListenLoadAndObserve() {
    this.picsArray.forEach((item, index,array) => {

      item.onload = ()=> {

           //set onload event handler to count all pics loaded, and set flag to enable lightbox scrolling
           this.galleryPicsLoaded++;
           if (this.galleryPicsLoaded+1 === array.length) {

             this.browseBlock = false;}
        //fade in above fold pics , and set flag to differentiate first screenfull
        let picTop = item.getBoundingClientRect().top;
        if (picTop < window.innerHeight) {
          item.style.opacity = "1";
          item.transform = "translateY(300)";
        }
        //hide below fold pics for floating in
        else if (picTop > window.innerHeight) {
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
      }
      if (index !== 0) {
        item.src = item.dataset.src;
        item.srcset = this.srcSets[index]
      }
      //place index in data att
      item.setAttribute("data-id", index);
      //set lightbox listener
      item.addEventListener("click", this.showLightbox.bind(this), true);


    });
  }

  intersectionCallback(entries) {
    entries.forEach((entry) => {

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

  lightboxRecursiveLoad() {
    this.loadLoopFired = true;

    this.preloadDiv = document.createElement('div');
    let loadLoop = (counter) => {
      if (counter === this.picsArray.length) {
        return
      }
      let preloadImage = new Image;

      //set load listener on image
      preloadImage.onload = () => {
        this.preloadDiv.append(preloadImage);
        this.picsArray[counter].fullResLoadedFlag = true;
        counter++;
        loadLoop(counter)
      }
      //load image
      preloadImage.src = this.loadedLightboxPics[counter];

    }
    loadLoop(0);
  }

  showLightbox(event) {

    if (!this.loadLoopFired) {
      this.lightboxRecursiveLoad()
    };



    this.galleryWrapper.classList.toggle('hide-scroll');
    this.close.style.opacity = 0.8;
    this.clickBlock = true;
    this.lightboxFlag = true;
   // this.headerClass.emit("o-0");
    this.picPointer = parseInt(event.target.dataset.id);
    this.lightboxFade.forEach(item => item.style.opacity = 0);
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
      this.lightbox.style.transition = "none";
      this.lightbox.style.opacity = '1';
      this.overlay.style.zIndex = "300";
      this.lightbox.style.zIndex = "200";
      void this.renderedGrid.offsetWidth;
      this.renderedGrid.style.transition = "opacity 1s ease-in-out"
      this.renderedGrid.style.opacity = 0;
      this.clickBlock = false;

    }, 300)
    //set onload event
    this.pic.onload = () => {
      if (this.pic.src === this.loadedLightboxPics[this.picPointer]) {

        return
      }
      if (this.pic.src === event.target.currentSrc) {
        this.pic.src = this.loadedLightboxPics[this.picPointer];


        return
      }

    }

    //put backup pic in lightbox
    this.pic.src = event.target.currentSrc
    //put this pic in lightbox
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
    let targetHeight = window.innerHeight * 0.8;
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
    this.fadeFlag = "reload";
    this.crossFadeDone = true;
  }
  resetScrollFade2() {
    this.fadeFlag2 = "reload";
    this.crossFadeDone2 = true;

  }



  browse(param) {
    if (this.browseBlock) {
      return
    }
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
    if (direction === "right" && this.picPointer === this.picsArray.length - 1 && !this.browseBlock) {
      this.closeLightbox();
    }

    // check lightbox flag and range for whole function
    if (this.lightboxFlag &&
      this.picPointer <= this.picsArray.length - 1 &&
      this.picPointer >= 0) {

      //adjust pointer according to direction
      if (direction === "left" && this.picPointer > 0) {
        this.picPointer -= 1;
      }
      if (direction === "right" && this.picPointer < this.picsArray.length - 1) {
        this.picPointer += 1;
      }

      //update pic
      if (this.picsArray[this.picPointer].fullResLoadedFlag) {
        this.pic.src = this.loadedLightboxPics[this.picPointer]
      } else {
        this.pic.src = this.picsArray[this.picPointer].currentSrc;
      }


      //BACKUP FADE IN CASE OF QUICK CLICK THROUGH

      //check if 1st fade is not done, if the second fade IS done and range should be allowed
      if (!this.crossFadeDone && this.picPointer < this.picsArray.length &&
        this.picPointer >= 0) {
        if (this.picPointer === 0) {
          this.startFlag = true;
        }
        //check direction and put previous pic in front to fade out according to direction
        if (direction === "right") {
          //manage first pic
          this.startFlag = false;
          //move right with animation
          this.faderB.src = this.loadedLightboxPics[
            this.picPointer - 1
          ]

          this.fadeFlag2 = "fire";
          this.crossFadeDone2 = false;
        }
        if (direction === "left") {
          let moveLeft = () => {
            this.faderB.src = this.loadedLightboxPics[
              this.picPointer + 1
            ]
            this.fadeFlag2 = "fire";
            this.crossFadeDone2 = false;
          }

          //manage first pic
          if (this.startFlag === true ) {
            moveLeft()
          }
          if (this.startFlag === false) {
            moveLeft()
          }
        }
      }


      //FADE WHEN CLICKING SLOWLY:

      // if scroll is fired before last scroll fade anim is finished, fire the backup fade anim
      // check range again
      if (this.crossFadeDone && this.crossFadeDone2 && this.picPointer < this.picsArray.length &&
        this.picPointer >= 0) {
        if (this.picPointer === 0) {
          this.startFlag = true;
        }
        //check direction and put previous pic in front to fade out according to direction
        if (direction === "right") {
          //manage first pic
          this.startFlag = false;
          //move right with animation

          this.fader.src = this.loadedLightboxPics[this.picPointer - 1]

          this.fadeFlag = "fire";
          this.crossFadeDone = false;
        }
        if (direction === "left") {
          let moveLeft = () => {


            this.fader.src = this.loadedLightboxPics[
              this.picPointer + 1];

            this.fadeFlag = "fire";
            this.crossFadeDone = false;
          }

          //manage first pic
          if (this.startFlag === true ) {

            moveLeft()
          }
          if (this.startFlag === false) {
            moveLeft()
          }
        }
        this.fadeFlag = "fire";
        this.crossFadeDone = false;
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



  closeLightbox() {
    this.galleryWrapper.classList.toggle('hide-scroll');
    this.close.style.opacity = 0;
    if (this.clickBlock === true) {
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
    this.lightboxFade.forEach(item => item.style.opacity = 1);

  }

}