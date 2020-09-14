import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
}

from '@angular/core';

import  "zenscroll"


import * as fileSaver from 'file-saver';

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
  Grid
} from '../shared/interfaces';

import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  state
} from '@angular/animations';
import { FileService } from '../file.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';



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
      trigger('showTimeAbout', [
        state('initial', style({
          opacity: "0.2"
        })),
        state('fadedIn', style({
          opacity: "1"
        })),
        transition('initial=>fadedIn', [animate('2s ease-out')]),
      ]),
    ]


  }

) export class GridLightboxComponent implements OnInit {
  @Input() gridData: any;
  @Input() view: any;
  gallery: Grid;
  grid: string;
  slug: string;
  trustedGrid: SafeHtml;
  galleryGrid: any;
  picsArray: any;
  overlay: any;
  pic:any = '';
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
  fullResPicUrls = [];
  lowResLoaded: Boolean = false;
  galleryPicsLoaded = 0;
  scrollValue: string;
  userScrollFlag = false;
  showArrows: Boolean = true;
  xBox: any;
  arrow: any;
  aTags: any;
  spinnerLightbox: any;
  fullResLoaded: boolean = false;
  galleryFrame: any;
  galleryBox: any;
  spinner: any;
  overlayCentralColumn: any;
  picOverlay: any;
  headerContainer: any;
  downloadArea: any;
  mobileFix: any = 0;
  downLoadLinkFlag: boolean=true;
  constructor(
    // private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    // private router: Router,
    private fileService: FileService
    ) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }
 download(){
   this.fileService.downloadFile(this.pic.src).subscribe(response => {
     let blob:any = new Blob([response._body],{ type:'image/jpeg'});
   let fileName= this.pic.src.split("/")[8].split("?")[0];
   fileSaver.saveAs(blob,fileName)
   })
 }
ngOnInit(): void {
    if(this.gridData.gridType==="commission"){
      this.downLoadLinkFlag = false;
    }
    this.srcUrls = this.gridData.srcUrls;
    this.srcSets = this.gridData.srcSets;
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.gridData.grid);
    if (this.view === "about") {
      this.showArrows = false;
    }
    this.spinner = document.querySelector(".spinner-cursor");
    this.spinner.style.display = "none";
  }

  onScroll(event) {
    // for scroll restoration, disable smooth scroll and 'float in' animation
    this.galleryWrapper.style.scrollBehavior = "auto";
    if (this.userScrollFlag) {
      this.picsArray.forEach(item => {
        item.style.transition = "opacity ease-out 2s, transform ease-out 1s";
      })
    }

    sessionStorage.setItem("scrollValue", event.srcElement.scrollTop);
    //reset flag for "float in"
    this.userScrollFlag = true;
  }

  ngAfterViewInit() {


    if(window.matchMedia("(max-width:400px)").matches){
      this.mobileFix = 1000;
    }

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
    this.overlayCentralColumn = document.querySelector("#central-column");
    this.leftPic = document.querySelector("#leftPic");
    this.rightPic = document.querySelector("#rightPic");
    this.fader = document.querySelector("#fader");
    this.faderB = document.querySelector("#faderB");
    this.spinnerLightbox = document.querySelector(".spinner-lightbox");
    this.xBox = document.querySelector('#xbox');
    this.aTags = document.querySelectorAll('a');
    this.picOverlay = document.querySelector('#pic-overlay');
    this.downloadArea = document.querySelector('#download-links');

    // style a tags
    this.aTags.forEach((item) => {
      item.style.textDecoration = "none";
      item.style.color = "black";
      item.addEventListener("mouseenter", (event) => {
        event.target.style.color = "#ff5039";
      });
      item.addEventListener("mouseleave", (event) => {
        event.target.style.color = "black";
      })
    })


    //set up cursor spinner for right scroll while still loading gallery pics
    window.addEventListener("mousemove", (e) => {
      this.spinnerLightbox.style.left = e.pageX + "px";
      this.spinnerLightbox.style.top = e.pageY + "px";
    })
    this.right.addEventListener("mouseenter", (e) => {
      this.spinnerLightbox.style.opacity = 1;
    });
    this.right.addEventListener("mouseleave", (e) => {
      this.spinnerLightbox.style.opacity = 0;
    })

    //set an SS value to trigger scroll reset in portfolio or commissions view

    sessionStorage.setItem("commissionsWhatLink", "grid-lightbox");
    sessionStorage.setItem("portfolioWhatLink", "grid-lightbox");
    //fire fade in
    this.galleryBox= document.querySelector("#gallery-box")

    //check if user came here via the navlink X back link, in which case temporarily disable 'float in' animation so that scroll position can be restored
    if ((this.view === "showcase")  && sessionStorage.getItem("showcaseWhatLink") === "back") {
      //set flag to bypass anim

      this.userScrollFlag = false;
      setTimeout(() => {
        this.scrollValue = sessionStorage.getItem("scrollValue");
        this.picsArray.forEach(item => {
          item.style.transition = "none";
        })
      })
        //run fade in with transition none
        this.galleryBox.style.transition="none";

    }


    if (this.view === "showcase" && sessionStorage.getItem("showcaseWhatLink") === "menu") {
      this.userScrollFlag = false;
      setTimeout(() => {
        this.picsArray.forEach(item => {
          item.style.transition = "none";
        })
      })
        //run fade in with transition none
        this.galleryBox.style.transition = "none";

    }
    if (this.view === "about" && sessionStorage.getItem("aboutWhatLink") === "back") {
      //set flag to bypass anim
      this.spinner.style.display="none";
      this.userScrollFlag = false;
      setTimeout(() => {
        this.scrollValue = sessionStorage.getItem("scrollValue");
        this.picsArray.forEach(item => {
          item.style.transition = "none";
        });

      })
       //run fade in with transition none
       this.galleryBox.style.transition="none";

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



    //hide arrow on scroll
    this.arrowFrame = document.querySelector("#arrow-frame");
    // add arrow hide listener
    this.galleryWrapper.onscroll = () => {
      this.arrowFrame.style.opacity = 0;
    }

    //target DOM element containing sanitized grid as innerHTML
    this.renderedGrid = document.querySelector('#renderedGrid');
    // make nodelist of img's within grid

    let picNodeList = this.renderedGrid.querySelectorAll('img');

    this.picsArray = Array.from(picNodeList)


    this.picsArray.forEach((item, index, array) => {
      item.style.border="none";
      item.style.transition = "opacity ease-out 2s, transform ease-out 1s";
      item.style.transform = "translateY(300px)";
      item.style.opacity = "0";

      let src = item.dataset.src.slice(8);
      this.fullResPicUrls[index] = "https://i0.wp.com/" + src + "?resize=1740&ssl=1";

    })
    void this.renderedGrid.offsetWidth;
    //set first pic load event handler
    this.picsArray[0].addEventListener("load", function () {
      // void this.picsArray[0].offsetWidth;
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
    this.galleryWrapper.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    })




  }

  picsListenLoadAndObserve() {

    this.picsArray.forEach((item, index, array) => {

      item.onload = () => {

        //set onload event handler to count all pics loaded, and set flag to enable lightbox scrolling
        this.galleryPicsLoaded++;
        if (this.galleryPicsLoaded + 1 === array.length) {
          this.lowResLoaded = true;
          this.spinnerLightbox.style.display = "none";


        }
        if ( this.galleryPicsLoaded ===4){
          this.spinner.style.display = "none";
        }
       // fade in above fold pics , and set flag to differentiate first screenfull
        let picTop = item.getBoundingClientRect().y - this.mobileFix;
        if (picTop < window.innerHeight) {
        void item.offsetWidth;
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }
        //hide below fold pics for floating in
        else if (picTop > window.innerHeight) {
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

      }
      //load all gallery pics
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

      let picTop = entry.boundingClientRect.top -this.mobileFix;

      // animate pics on entry and exit (if loaded)
      if (picTop < window.innerHeight ) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = 'translateY(0)';
      }

      if (picTop > window.innerHeight ) {
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
        this.fullResLoaded = true;
        return
      }
      let preloadImage = new Image;

      //set load listener on image
      preloadImage.onload = () => {
        this.preloadDiv.append(preloadImage);
        this.picsArray[counter].fullResLoadedFlag = true;
        if (this.pic.currentSrc === this.picsArray[counter].src) {
          this.pic.src = this.fullResPicUrls[counter];

        }
        counter++;
        loadLoop(counter)
      }
      //load image
      preloadImage.src = this.fullResPicUrls[counter];
    }
    loadLoop(0);
  }

  showLightbox(event) {
    this.headerContainer= document.querySelector("#header");
    this.headerContainer.style.pointerEvents = "none";

    if (!this.loadLoopFired) {
      this.lightboxRecursiveLoad()
    };

    this.galleryWrapper.classList.toggle('hide-scroll');
    this.clickBlock = true;
    this.lightboxFlag = true;
    this.picPointer = parseInt(event.target.dataset.id);
    this.lightboxFade.forEach(item => item.style.opacity = 0);


    this.picZoom(event.target);

    //show lightbox after transition to hide renderedGrid
    setTimeout(() => {
      this.overlay.style.transition = "opacity 0.7s ease-in-out";
      this.overlay.style.opacity = 1;
      this.arrowFrame.style.opacity = 0;
      this.lightbox.style.transition = "none";
      this.lightbox.style.opacity = '1';
      this.overlay.style.zIndex = "300";
      this.lightbox.style.zIndex = "200";
      void this.renderedGrid.offsetWidth;
      this.renderedGrid.style.transition = "opacity 0.7s ease-in-out"
      this.renderedGrid.style.opacity = 0;
      this.clickBlock = false;

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

    }, 300)
    //set pic load event
    this.pic.onload = (event) => {

      if (this.pic.src === event.target.currentSrc) {
        this.pic.src = this.fullResPicUrls[this.picPointer];


        return
      }

    }
    //put backup pic in lightbox
    this.pic.src = event.target.currentSrc
    //set lightbox overlay "close" area to size of pic:
    this.overlayCentralColumn.style.width = this.pic.offsetWidth +"px";
    this.picOverlay.style.width = this.pic.offsetWidth + "px";
    this.picOverlay.style.height = this.pic.offsetHeight + "px";
    this.xBox.style.height = (window.innerHeight / 2 - this.pic.offsetHeight / 2) + "px";


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
    if (!this.lowResLoaded) {
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
    if (direction === "right" && this.picPointer === this.picsArray.length - 1) {
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
      //set onload event
      this.picsArray[this.picPointer].onload = (event) => {

        if (this.picsArray[this.picPointer] === this.fullResPicUrls[this.picPointer]) {
          return
        }
      }
      //update pic
      if (this.picsArray[this.picPointer].fullResLoadedFlag) {
        this.pic.src = this.fullResPicUrls[this.picPointer]
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
          if (this.picsArray[this.picPointer - 1].fullResLoadedFlag) {
            this.faderB.src = this.fullResPicUrls[this.picPointer - 1]
          } else {
            this.faderB.src = this.picsArray[this.picPointer - 1].currentSrc;
          }

          this.fadeFlag2 = "fire";
          this.crossFadeDone2 = false;
        }
        if (direction === "left") {
          let moveLeft = () => {
            if (this.picsArray[this.picPointer + 1].fullResLoadedFlag) {
              this.faderB.src = this.fullResPicUrls[this.picPointer + 1]
            } else {
              this.faderB.src = this.picsArray[this.picPointer + 1].currentSrc;
            }
            this.fadeFlag2 = "fire";
            this.crossFadeDone2 = false;
          }

          //manage first pic
          if (this.startFlag === true) {
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

          if (this.picsArray[this.picPointer - 1].fullResLoadedFlag) {
            this.fader.src = this.fullResPicUrls[this.picPointer - 1]
          } else {
            this.fader.src = this.picsArray[this.picPointer - 1].currentSrc;
          }

          this.fadeFlag = "fire";
          this.crossFadeDone = false;
        }
        if (direction === "left") {
          let moveLeft = () => {

            if (this.picsArray[this.picPointer + 1].fullResLoadedFlag) {
              this.fader.src = this.fullResPicUrls[this.picPointer + 1]
            } else {
              this.fader.src = this.picsArray[this.picPointer + 1].currentSrc;
            }

            this.fadeFlag = "fire";
            this.crossFadeDone = false;
          }

          //manage first pic
          if (this.startFlag === true) {

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
        this.arrow = "o-0";
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
    this.headerContainer.style.pointerEvents = "auto";
    this.galleryWrapper.classList.toggle('hide-scroll');
    this.overlay.style.transition = "none";
    this.overlay.style.opacity = 0;
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
