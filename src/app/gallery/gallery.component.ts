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
  @Output() hideMenuEmit = new EventEmitter;
  galleryWrapper: any;

  constructor( private route: ActivatedRoute, private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    //set up values
    this.grids = this.route.snapshot.data['grids'];
    this.getGalleryName(this.route.snapshot.params['slug']);
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.grid);
    //make full res photos Preload array
    let imgsPreload = document.createElement("DIV");
    imgsPreload.innerHTML = this.grid;
    let bigPicArray = imgsPreload.querySelectorAll('img');
    this.bigPicArray = bigPicArray;
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
       // entry.target.classList.add("picAnim");
        entry.target.style.transition="opacity 1s, transform ease-out 1s";
        entry.target.style.opacity="1";
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }

  showLightbox(event) {
    this.lightboxFlag = true;
    this.picPointer = parseInt(event.target.dataset.id);
    let photo = event.target;
    //this.picZoom(photo);
    //show lightbox after transition to hide galleryGrid
    setTimeout(() => {
      this.overlay.style.opacity = '1';
      this.overlay.style.zIndex = "10";
      this.lightbox.style.opacity = '1';
    }, 300)

    //add cursor hover classes
    this.overlay.classList.add('no-cursor');
    this.left.classList.add("left-arrow");
    this.right.classList.add("right-arrow");
    this.lightbox.classList.add("grid");

    //put this pic in lightbox
    this.pic.src = event.target.src;
    this.pic.srcset = "";
  }

  picZoom(photo) {
    // get the event targets shape and position in viewport
    let photoSource = photo.getBoundingClientRect();

    // work out 80% height and resultant width
    let AspectRatio = Math.round(photoSource.width / photoSource.height);
    let targetHeight = window.innerHeight * 0.8;
    let targetWidth = targetHeight * AspectRatio;

    // work out top and left values for fixed lightbox in the target
    let targetLeft = window.innerWidth / 2 - targetWidth / 2;
    let targetTop = window.innerHeight / 2 - targetHeight / 2;

    //work out gallery top and left and width values for zoomed position

    let zoomRatio = targetWidth / photoSource.width;
    let picZoomedDiffX = photoSource.left - targetLeft;
    let picZoomedDiffY = photoSource.top - targetTop ;

    // change transfom origin to center of target and trigger galleryGrid's zoom transition

    // photo.style.transformOrigin = `${sourceMiddleX}px ${sourceMiddleY}px`;
    photo.style.transform = "translateX(" + picZoomedDiffX + "px)";
    photo.style.transform += "translateY(" + picZoomedDiffY + "px)";
    photo.style.transform += `scale(${zoomRatio}, ${zoomRatio})`;
    //place lightbox in center of fixed overlay
    this.lightbox.style.left = targetLeft + "px";
    this.lightbox.style.top = targetTop + "px";
    this.lightbox.style.width = targetWidth + "px";
    console.dir(photo);
    console.log(
      `photoSource.left:${photoSource.left},photoSource.top:${photoSource.top}\n`,
      `targetLeft:${targetLeft},targetTop:${targetTop}\n`,
      `picZoomedDiffX:${picZoomedDiffX},pixZoomedDiffY:${picZoomedDiffY}\n`,
      `galleryTransformOrigin: ${photo.style.transformOrigin}`,
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
    this.lightbox.style.opacity = "0";
    //remove hover classes
    this.overlay.classList.remove("no-cursor");
    this.left.classList.remove("left-arrow");
    this.right.classList.remove("right-arrow");
    this.lightbox.classList.remove("grid");
    //hide overlay w transition
    this.overlay.style.opacity = "0";
    //put overlay behind so we can click on pics again
    this.overlay.style.zIndex = "-1"
    //transition:
    this.galleryGrid.style.transform = "scale(1,1)";
    this.galleryGrid.style.transform += "translateX(0px)";
    this.galleryGrid.style.transform += "translateY(0px)"

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
