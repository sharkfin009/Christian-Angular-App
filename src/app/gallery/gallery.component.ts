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
import {
  doesNotThrow
} from 'assert';


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
  newPic: any;
  outletWrapper: any;
  body: any;
  mask:any;
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

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

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

    if (this.slug === "showcase") {
      this.pageTitle.style.opacity = '0';
    } else {
      this.pageTitle.style.opacity = '1';
    }
    this.mask = document.querySelector("#mask");
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
         //hide pics not on page
        let picTop = item.getBoundingClientRect().top;
        if (picTop > window.innerHeight/3) {
          item.style.opacity = "0";
          item.style.transform = 'translateY(300px)';
          console.log();

          //set up intersection observors for pics off page
          let observer = new IntersectionObserver(this.intersectionCallback, options);
          observer.observe(item);
        }
      }

    );
    this.left.addEventListener("click", this.browseLeft.bind(this), false);
    this.right.addEventListener("click", this.browseRight.bind(this), false);
  }

  intersectionCallback(entries) {
    entries.forEach(entry => {
      let picTop = entry.target.getBoundingClientRect().top;
      if (picTop < window.innerHeight) {
        entry.target.style.transition = "opacity 1s, transform ease-out 1s";
        entry.target.style.opacity = "1";
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }

  showLightbox(event) {
    this.lightboxFlag = true;
    this.headerClass.emit("o-0");
    this.picPointer = parseInt(event.target.dataset.id) ;
    this.mask.style.opacity=0;
    this.picZoom(event.target);
    //show lightbox after transition to hide galleryGrid
    setTimeout(() => {
      this.lightbox.style.opacity = '1';

       this.overlay.style.zIndex = "300";
       this.lightbox.style.zIndex = "200";
       this.galleryGrid.classList.remove("gridFadeOut");
       void this.galleryGrid.offsetWidth;
       this.galleryGrid.classList.add("gridFadeOut");
       this.galleryGrid.style.opacity=0;
    }, 300)

    //add cursor hover classes

    this.left.classList.add("left-arrow");
    this.right.classList.add("right-arrow");
    this.close.classList.add("grid");

    //put this pic in lightbox
    this.pic.src = event.target.src;
    this.pic.srcset = event.target.srcset;

    //prepare next and previous elements
    if (this.picPointer > 1) {
      this.previous.src = this.picsArray[this.picPointer - 1].src;
      this.previous.srcset = this.picsArray[this.picPointer - 1].srcset;
    }
    if (this.picPointer < this.picsArray.length - 2) {
      this.next.src = this.picsArray[this.picPointer + 1].src;
      this.next.srcset = this.picsArray[this.picPointer + 1].src;
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

    console.log(

      // `zoomRatio:${zoomRatio}\n`,
      // `cumulativeOffset(photo).left:${this.cumulativeOffset(photo).left}\n`,
      // `cumulativeOffset(photo).top:${this.cumulativeOffset(photo).top}\n`,
      // `targetMiddleY:${targetMiddleY}\n`,
      // `diffX:${diffX},diffY:${diffY}\n`,

    );

  }

  browseLeft(e) {
    if (this.lightboxFlag) {
      //assign next pic
      if (this.picPointer>0) {
        console.log(this.picPointer);
        this.picPointer -= 1;

        this.pic.srcset = this.picsArray[this.picPointer].srcset;
        this.pic.src = this.picsArray[this.picPointer].src;
        this.galleryGrid.style.transform = "none";
        let photo = document.querySelector(`[data-id="${this.picPointer}"]`)

        let scrollAmount = this.cumulativeOffset(photo, 5).top + photo.clientHeight / 2 - this.galleryWrapper.clientHeight / 2; ;
        this.galleryWrapper.scrollTo(0, scrollAmount);
        this.picZoom(photo);

        // set up 'previous'
       if (this.picPointer>0){
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
      if (this.picPointer <= this.picsArray.length-2 ) {
        this.picPointer += 1;
        this.pic.srcset = this.picsArray[this.picPointer].srcset;
        this.pic.src = this.picsArray[this.picPointer].src;
        this.galleryGrid.style.transform="none";
        let photo = document.querySelector(`[data-id="${this.picPointer}"]`)

        let scrollAmount = this.cumulativeOffset(photo, 5).top + photo.clientHeight / 2 - this.galleryWrapper.clientHeight / 2; ;
        this.galleryWrapper.scrollTo(0, scrollAmount);
        this.picZoom(photo);

        // set up 'previous'

        if (this.picPointer > 0){
          this.previous.src = this.picsArray[this.picPointer - 1].src;
        this.previous.srcset = this.picsArray[this.picPointer - 1].srcset;
        }

        // fade out old
        this.previous.classList.remove("picFadeOut");
        void this.previous.offsetWidth;
        this.previous.classList.add("picFadeOut");
        this.previous.style.opacity="0";

        // set up 'next'
if(this.picPointer<=this.picsArray.length -2){

  this.next.src = this.picsArray[this.picPointer + 1].src;
  this.next.srcset = this.picsArray[this.picPointer + 1].srcset;
}
      };
    }
  }

  closeLightbox(e) {
    //show grid
    this.galleryGrid.style.opacity=1;
    // let pics= document.querySelectorAll("img");
    // pics.forEach(
    //   (item)=>{
    //     if (item.dataset.id !== this.picPointer){
    //       console.dir(item);
    //       item.style.opacity="0";
    //       item.classList.remove("gridFadeIn");
    //       void item.offsetWidth;
    //       item.classList.add("gridFadeIn");
    //       item.style.opacity="1";
    //     }
    //   }
    // )

    //switch flag
    this.lightboxFlag = false;
    //emit class to hide header
    this.headerClass.emit('o-100')
    // hide mask
    this.mask.classList.remove("maskFadeIn");
    void this.mask.offsetWidth;
    this.mask.classList.add("maskFadeIn")
    this.mask.style.opacity=1;
    //hide bbutton
    this.pageTitle.style.opacity = '1';
    // hide lightbox
    this.lightbox.style.opacity = "0";
    //this.overlay.style.opacity = "0";
    this.lightbox.style.zIndex = "-1";
    //put overlay behind so we can click on pics again
    this.overlay.style.zIndex = "-1"
    //remove hover classes
    this.overlay.classList.remove("no-cursor");
    this.left.classList.remove("left-arrow");
    this.right.classList.remove("right-arrow");
    this.lightbox.classList.remove("grid");
    //scroll
    let photo = document.querySelector(`[data-id="${this.picPointer}"]`);


    // reset transform
    this.galleryGrid.style.transform = "none";


  }

}
