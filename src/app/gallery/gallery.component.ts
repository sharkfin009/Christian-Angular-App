import {
  Component,
  OnInit,
  Output,
  EventEmitter,
}

from '@angular/core';

import {
  DomSanitizer,
  SafeHtml,
}

from '@angular/platform-browser'

import {
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


@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
  }

) export class GalleryComponent implements OnInit {
  grids: any[];
  grid: string;
  slug: string;
  trustedGrid: SafeHtml;
  galleryGrid: any;
  picsArray: any[];
  bigPicArray: any;
  overlay: any;
  pic: any;
  zoom: string;
  lightboxFade: any;
  pageTitle: any;
  left: any;
  right: any;
  lightboxFlag: boolean;
  lightboxNavFlag: boolean;
  picPointer: any;
  fullWrapper: any;
  header: any;
  lightbox: any;
  nextPic: any;
  outletWrapper: any;
  body: any;
  targetMiddleY: any;
  close: any;
  photo:any;
  @Output() hideMenuEmit = new EventEmitter;
  galleryWrapper: any;

  constructor( private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    //set up values
    this.grids = this.route.snapshot.data['grids'];
    this.getGalleryName(this.route.snapshot.params['slug']);
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.grid);
    //make full res photos Preload array
    // let imgsPreload = document.createElement("DIV");
    // imgsPreload.innerHTML = this.grid;
    // let bigPicArray = imgsPreload.querySelectorAll('img');
    // this.bigPicArray = bigPicArray;
  }

  getGalleryName(slug: string): void {
    let gallery = this.grids.find((gallery) => gallery.slug === slug);
    this.slug = gallery.slug;
    this.grid = gallery.grid;
  }


  ngAfterViewInit() {
    //set up DOM values
    this.body = document.querySelector("body");
    this.lightbox = document.querySelector('#lightbox');
    this.galleryGrid = document.querySelector('#galleryGrid');
    this.lightboxFade = document.querySelector(".lightbox-fade");
    this.pageTitle = document.querySelector("#page-title");

    if (this.slug === "showcase"){
      this.pageTitle.style.opacity='0';
    } else {
      this.pageTitle.style.opacity='1';
    }

    this.overlay = document.querySelector("#overlay");
    this.pic = document.querySelector("#pic");
    this.left = document.querySelector("#left");
    this.right = document.querySelector("#right");
    this.fullWrapper = document.querySelector(".full-wrapper");
    this.galleryWrapper = document.querySelector("#galleryWrapper");
    this.outletWrapper = document.querySelector("#outlet-wrapper");
    this.close = document.querySelector("#close")
    //make Array of img's
    this.picsArray = this.galleryGrid.querySelectorAll('img');

    this.picsArray.forEach((item, index) => {
        //set event listener
        item.setAttribute("data-id", index);
        item.addEventListener("click", this.showLightbox.bind(this), true);
         //set up intersection observer options
         let options = {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        }
        // //hide pics not on page
        let picTop = item.getBoundingClientRect().top;
        if (picTop > window.innerHeight) {
          item.style.opacity = "0";
          item.style.transform = 'translateY(100px)';
          console.log();

          //set up intersection observors for pics off page
          let observer = new IntersectionObserver(this.intersectionCallback, options);
          observer.observe(item);
        }
      }

    );
    this.left.addEventListener("click", this.browseLeft.bind(this), true);
    this.right.addEventListener("click", this.browseRight.bind(this), true);
  }

  intersectionCallback(entries) {
    entries.forEach(entry => {
      let picTop = entry.target.getBoundingClientRect().top;
      if (picTop < window.innerHeight) {
        entry.target.style.transition="opacity 1s, transform ease-out 1s";
        entry.target.style.opacity="1";
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }

  showLightbox(event) {
    this.lightboxFlag = true;
    this.picPointer = parseInt(event.target.dataset.id);
   this.picZoom(event.target);
    //show lightbox after transition to hide galleryGrid
    setTimeout(() => {
       this.lightbox.style.opacity = '0';
      this.overlay.style.zIndex = "300";
       this.lightbox.style.zIndex ="200";

    }, 300)

    //add cursor hover classes

    this.left.classList.add("left-arrow");
    this.right.classList.add("right-arrow");
    this.close.classList.add("grid");

    //put this pic in lightbox
    this.pic.src = event.target.src;
   // this.pic.srcset = "";
  }

  picZoom(photo) {
    // get the event targets shape and position in viewport
   // photo.style.boxSizing = "border-box";
    let photoUnzoomed = photo.getBoundingClientRect();
    let cumulativeOffset = function(element) {
      let top = 0, left = 0, i=0;
      do {
          top += element.offsetTop  || 0;
          left += element.offsetLeft || 0;
          element = element.offsetParent;
          i++;
      } while(i<=4);

      return {
          top: top,
          left: left
      };
    }
    //work out 80% height and resultant width
    let aspectRatio = photoUnzoomed.height / photoUnzoomed.width;
    let targetHeight = window.innerHeight * 0.8;
    let targetWidth = targetHeight * aspectRatio;

    // work out top and left values for target
    let targetTop = window.innerHeight / 2 - targetHeight/2 ;
    let targetLeft = window.innerWidth / 2 - targetWidth/2;

    //work out photo scale and transform values for zoomed position

    let zoomRatio =  photoUnzoomed.width/targetWidth ;
    let diffX = targetLeft - cumulativeOffset(photo).left;
    let diffY = targetTop - cumulativeOffset(photo).top;

    //do transforms
    this.galleryGrid.style.transformOrigin=`${targetLeft + photoUnzoomed.width/2} ${targetTop + photoUnzoomed.height/2}`;
    //  this.galleryGrid.style.transform =  `translate(${diffX}px,${diffY}px)`;
     this.galleryGrid.style.transform += `scale(${zoomRatio})`;

    // photo.style.position="absolute";
    // photo.style.left = "-100px";
    // photo.animate({
    //   transform: [`translateY(0px)`, `translateY(100px)`]
    // }, {
    //   duration: 1000,
    //   fill:'both',
    //   composite:'add',

    // });
    // photo.animate({
    //   transform: [`scale(1)`, `scale(${zoomRatio}`]
    // }, {
    //   duration: 1000,
    //   fill:'both',
    //   composite:'add',
    // });


  //  photo.style.transformOrigin = `${photoUnzoomed.left+photoUnzoomed.width/2} ${photoUnzoomed.top+photoUnzoomed.height/2}`;


    //place lightbox in center of fixed overlay

    this.photo=photo;
    console.dir(photo);
    console.log(
      `zoomRatio:${zoomRatio}`,
      `photoUnzoomed.left:${photoUnzoomed.left},photoUnzoomed.top:${photoUnzoomed.top}\n`,
      `targetLeft:${targetLeft},targetTop:${targetTop}\n`,
      `diffX:${diffX},pixZoomedDiffY:${diffY}\n`,

    );

  }

  browseLeft(e) {
    if (this.lightboxFlag) {
      //assign next pic
      if (this.picPointer > 0) {
        this.picPointer -= 1;
        this.nextPic = this.picsArray[this.picPointer];
        this.pic.srcset = this.nextPic.srcset;
        this.pic.src = this.nextPic.src;
        //apply transform to the chosen pic to prepare for zooming back when lightbox closes
        this.picZoom(this.nextPic);
        // this.galleryWrapper.scrollTo(0, this.targetMiddleY - window.innerHeight / 2);
      };
    }
  }

  browseRight(e) {
    if (this.lightboxFlag) {

      //assign next pic
      if (this.picPointer <= this.picsArray.length - 2) {
        this.picPointer += 1;
        this.nextPic = this.picsArray[this.picPointer];
        this.pic.srcset = this.nextPic.srcset;
        this.pic.src = this.nextPic.src;
        //apply transform to the chosen pic to prepare for zooming back when lightbox closes
        this.picZoom(this.nextPic);
        // this.galleryWrapper.scrollTo(0, this.targetMiddleY - window.innerHeight / 2);

      };
    }
  }

  closeLightbox(e) {
    //switch flag
    this.lightboxFlag = false;
    //hide bbutton
    this.pageTitle.style.opacity = '1';
    // hide lightbox
    //this.lightbox.style.opacity = "0";
    //this.overlay.style.opacity = "0";
    this.lightbox.style.zIndex = "-1";
    //put overlay behind so we can click on pics again
    this.overlay.style.zIndex = "-1"
    //remove hover classes
    this.overlay.classList.remove("no-cursor");
    this.left.classList.remove("left-arrow");
    this.right.classList.remove("right-arrow");
    this.lightbox.classList.remove("grid");


    //transition:
    this.galleryGrid.style.transform = "scale(1,1)";
    this.galleryGrid.style.transform += "translateX(0px)";
    this.galleryGrid.style.transform += "translateY(0px)";
    //this.galleryGrid.style.opacity = "1";

    //reset after transition:
    setTimeout(() => {
        //empty pic
        this.pic.src = "";
        this.pic.srcset = "";
        //clear NextPic
        this.nextPic = undefined;
        this.body.classList.remove('stop-scrolling');

      }

      , 300)
  }

  ;
}
