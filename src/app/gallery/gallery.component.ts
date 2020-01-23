import {
  Component,
  OnInit,

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
  GetLightboxesService
}

from '../shared/getLightboxes.service';

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
  lightboxesObs: any;
  galleryGrid: any;
  picsArray: any[];
  bigPicArray: any;
  overlay: any;
  pic: any;
  picWidth: string;
  lightboxFade: any;
  bbutton: any;
  left: any;
  right: any;
  lightboxFlag: boolean;
  lightboxNavFlag: boolean;
  picPointer: any;
  fullWrapper: any;
  header: any;
  lightbox: any;
  lightboxes = [];
  nextPic: any;
  outletWrapper: any;
  body:any;

  constructor(private pullLightboxes: GetLightboxesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}


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
    this.bbutton = document.querySelector("#bbutton")
    this.overlay = document.querySelector("#overlay");
    this.pic = document.querySelector("#pic");
    this.left = document.querySelector("#left");
    this.right = document.querySelector("#right");
    this.fullWrapper = document.querySelector(".full-wrapper");
    this.header = document.querySelector(".header");
    this.outletWrapper = document.querySelector("#outlet-wrapper");
    //make Array of img's
    this.picsArray = this.galleryGrid.querySelectorAll('img');

    //set event listener
    this.picsArray.forEach((item, index) => {
        item.setAttribute("data-id", index);
        item.addEventListener("click", this.showLightbox.bind(this), true);
      }

    );
    this.left.addEventListener("click", this.browseLeft.bind(this), true);
    this.right.addEventListener("click", this.browseRight.bind(this), true);
  }

  getLightboxGrid(alt) {
    let id = alt.slice(alt.length - 2);
    let linkedLightbox = this.lightboxes.find(lightbox => lightbox.slug.slice(lightbox.slug.length - 2) === id);
    return linkedLightbox
  }

  cumulativeOffset(originOffset) {
    let top = 0,
      left = 0,
      i = 0;

    do {
      top += originOffset.offsetTop || 0;
      left += originOffset.offsetLeft || 0;
      originOffset = originOffset.offsetParent;
      i++;
    }

    while (i <= 4);

    return {
      top: top,
      left: left
    }
  }

  showLightbox(event) {
    this.lightboxFlag = true;
    this.picPointer = parseInt(event.target.dataset.id);
    let zoomTarget = event.target;
    this.picZoom(zoomTarget);
    //show lightbox after transition to hide galleryGrid
    setTimeout(() => {
      this.overlay.style.opacity ='1';
      this.overlay.style.zIndex="2";
      this.lightbox.style.opacity='1';
      this.body.classList.add('stop-scrolling');
    }, 300)
    //hide header nav bbuton, gallery and heading
    this.lightboxFade.style.opacity = '0';
    this.bbutton.style.opacity='0';

    //add cursor hover classes
    this.overlay.classList.add('no-cursor');
    this.left.classList.add("left-arrow");
    this.right.classList.add("right-arrow");
    this.lightbox.classList.add("grid");

    //put this pic in lightbox
    this.pic.src = event.target.src;
    this.pic.srcset = "";
  }

  picZoom(zoomTarget) {
    // get the event targets shape and position in viewport
    let zoomTargetPos = this.cumulativeOffset(zoomTarget);
    let unzoomedLeft = zoomTargetPos.left;
    let unzoomedTop = zoomTargetPos.top;
    let unzoomedWidth = zoomTarget.offsetWidth;
    let unzoomedHeight = zoomTarget.offsetHeight;

    // work out 80% height and resultant width
    let ratio = unzoomedWidth / unzoomedHeight;
    let centerHeight = window.innerHeight * 0.8;
    let centerWidth = centerHeight * ratio;

    // work out top and left values for fixed lightbox in the center
    let centerLeft = window.innerWidth / 2 - centerWidth / 2;
    let centerTop = window.innerHeight / 2 - centerHeight / 2;

    //work out gallery top and left and width values for zoomed position
    let galleryOffset = this.header.offsetHeight;
    let picWidthRatio = centerWidth / unzoomedWidth;
    let unzoomedMiddleX = unzoomedLeft + unzoomedWidth / 2;
    let unzoomedMiddleY = unzoomedTop + unzoomedHeight / 2;
    let centerMiddleX = centerLeft + centerWidth / 2;
    let centerMiddleY = centerTop + centerHeight / 2 - galleryOffset;
    let picZoomedLeftDiffX = centerMiddleX - unzoomedMiddleX - window.innerWidth * 0.15;
    let picZoomedTopDiffY = centerMiddleY - unzoomedMiddleY + window.scrollY;

    // change originOffset properties to trigger galleryGrid's zoom transition
    this.galleryGrid.style.transformOrigin = `${unzoomedMiddleX}px ${unzoomedMiddleY}px`;
    this.galleryGrid.style.transform = "translateX(" + picZoomedLeftDiffX + "px)";
    this.galleryGrid.style.transform += "translateY(" + picZoomedTopDiffY + "px)";
    this.galleryGrid.style.transform += `scale(${picWidthRatio}, ${picWidthRatio})`;
    //place lightbox in center of fixed overlay
     this.lightbox.style.left = centerLeft + "px";
     this.lightbox.style.top = centerTop + "px";
     this.lightbox.style.width = centerWidth + "px";
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
      };
    }
  }

  browseRight(e) {
    if (this.lightboxFlag) {

      //assign next pic
      if (this.picPointer <= this.picsArray.length-2) {
        this.picPointer += 1;
        this.nextPic = this.picsArray[this.picPointer];
        this.pic.srcset = this.nextPic.srcset;
        this.pic.src = this.nextPic.src;
        //apply transform to the chosen pic to prepare for zooming back when lightbox closes
        this.picZoom(this.nextPic);
      };
    }
  }

  closeLightbox(e) {
    //switch flag
    this.lightboxFlag = false;
    //hide bbutton
    this.lightboxFade.style.opacity = "1";
    this.bbutton.style.opacity = '1';
    // hide lightbox
    this.lightbox.style.opacity ="0";
    //remove hover classes
    this.overlay.classList.remove("no-cursor");
    this.left.classList.remove("left-arrow");
    this.right.classList.remove("right-arrow");
    this.lightbox.classList.remove("grid");
    //hide overlay w transition
    this.overlay.style.opacity="0";
    //put overlay behind so we can click on pics again
    this.overlay.style.zIndex="0"
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
