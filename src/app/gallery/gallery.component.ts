import {
  Component,
  OnInit,

} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser'
import {
  ActivatedRoute,
} from '@angular/router';
import {
  GetLightboxesService
} from '../shared/getLightboxes.service';
import {
  map,
  shareReplay,
} from 'rxjs/operators';

import {
  Observable
} from 'rxjs';




@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  grids: any[];
  grid: string;
  slug: string;
  trustedGrid: SafeHtml;
  lightboxes: any;
  galleryGrid: any;
  array: any[];
  overlay: any;
  pic: any;
  bbutton: any;
  left: any;
  right: any;
  lightboxFlag: boolean;
  picPointer: any;
  fullWrapper: any;

  constructor(private pullLightboxes: GetLightboxesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

  }


  ngOnInit(): void {
    //set up values
    this.grids = this.route.snapshot.data['grids'];
    this.lightboxes = this.route.snapshot.data['lightboxes'];
    this.getGalleryName(this.route.snapshot.params['slug']);
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.grid);
  }

  getGalleryName(slug: string): void {
    let gallery = this.grids.find((gallery) => gallery.slug === slug);
    this.slug = gallery.slug;
    this.grid = gallery.grid;
  }


  ngAfterViewInit() {
    //set up DOM values
    this.galleryGrid = document.querySelector('#galleryGrid');
    this.bbutton = document.querySelector("#bbutton");
    this.overlay = document.querySelector("#overlay");
    this.pic = document.querySelector("#pic");
    this.left = document.querySelector("#left");
    this.right = document.querySelector("#right");
    this.fullWrapper = document.querySelector(".full-wrapper");
    //make array of img's
    this.array = this.galleryGrid.querySelectorAll('img');
    //set event listener
    this.array.forEach((item, index) => {
      item.setAttribute("data-id", index);
      addEventListener("click", this.showLightbox.bind(this), true);

      // preload all imgs in cache
      let preload = document.createElement('img');
      preload.srcset = item.srcset;
      preload.src = item.src;
      preload.width = window.innerWidth;
    });
    this.left.addEventListener("click", this.browseLeft.bind(this), true);
    this.right.addEventListener("click", this.browseRight.bind(this), true);
  }

  // getLightboxGrid(target, lightboxes) {
  //   //access and place correct lightbox grid
  //   let altText = target.alt;
  //   let id = altText.slice(altText.length - 2);
  //   let linkedLightbox = lightboxes.find(lightbox => lightbox.slug.slice(lightbox.slug.length - 2) === id);
  //   if (linkedLightbox) {
  //     this.pic.innerHtml = linkedLightbox;
  //   }
  // }


  showLightbox(event) {

    if (event.target.classList[0] === "q") {
      this.lightboxFlag = true;
      this.picPointer = parseInt(event.target.dataset.id);
      // get the event targets shape and position in viewport
      let viewportOffset = event.target.getBoundingClientRect();
      let unzoomedLeft = viewportOffset.left
      let unzoomedTop = viewportOffset.top;
      let unzoomedWidth = event.target.offsetWidth;
      let unzoomedHeight = event.target.offsetHeight;


      //build copy of event target in the fixed parent div using the #pic div

      this.pic.src = event.target.src;
      this.pic.srcset = event.target.srcset;
      this.pic.dataset.id = event.target.dataset.id

      // work out 80% height and resultant width
      let ratio = unzoomedWidth / unzoomedHeight;
      let centerHeight = window.innerHeight * 0.8;
      let centerWidth = Math.floor(centerHeight * ratio);


      // work out div top and left values for enlarged div in the center
      let centerLeft = (window.innerWidth / 2 - centerWidth / 2);
      let centerTop = (window.innerHeight / 2 - centerHeight / 2);

      //place div in center mr venter
      this.pic.style.left = centerLeft + "px";
      this.pic.style.top = centerTop + "px";
      this.pic.style.width = centerWidth + 'px';

      //pass in css variables and add class to trigger chosen pic's zoom animation
      this.pic.style.setProperty('--left', unzoomedLeft + "px");
      this.pic.style.setProperty('--top', unzoomedTop + "px");
      this.pic.style.setProperty('--width', unzoomedWidth + 'px');
      this.pic.style.setProperty('--leftCenter', centerLeft + "px");
      this.pic.style.setProperty('--topCenter', centerTop + "px");
      this.pic.style.setProperty('--widthCenter', centerWidth + 'px');
      this.pic.classList.add('zoomIn');

      //work out gallery top and left and width values for zoomed position
      let cumulativeOffset = function(element) {
        let top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        };
    };

      let zoomTargetPos = cumulativeOffset(event.target);

      let galleryWidth = this.fullWrapper.offsetWidth;
      let galleryHeight = this.fullWrapper.offsetHeight;
      let picWidthRatio = centerWidth / unzoomedWidth;
      let unzoomedMiddleX = zoomTargetPos.left + unzoomedWidth / 2;
      let unzoomedMiddleY = zoomTargetPos.top + unzoomedHeight / 2;
      let centerMiddleX = centerLeft + centerWidth / 2;
      let centerMiddleY = centerTop + centerHeight / 2;
      let picZoomedLeftOffset = centerMiddleX - unzoomedMiddleX;
      let picZoomedTopOffset = centerMiddleY - unzoomedMiddleY;
      let originX = (unzoomedMiddleX / galleryWidth) * 100;
      let originY = (unzoomedMiddleY / galleryHeight) * 100;
      console.log(`galleryWidth:${galleryWidth},galleryHeight:${galleryHeight}\n`, `unzoomedMiddleX:${unzoomedMiddleX},unzoomedMiddleY:${unzoomedMiddleY}\n`, `origin x:${Math.round(originX)}px origin y:${Math.round(originY)}px\n`, "picWidthRatio:" + Math.round(picWidthRatio));

      // change element properties to trigger outermost div's parallel zoom transition

      this.fullWrapper.style.transformOrigin = `${unzoomedMiddleX}px ${unzoomedMiddleY}px`;
      this.fullWrapper.style.transform = `scale(${picWidthRatio},${picWidthRatio})`;
      // this.fullWrapper.style.left =  picZoomedLeftOffset + 'px';
     //  this.fullWrapper.style.top = picZoomedTopOffset + "px";

      //fade in overlay and fade out gallery with css transition
      this.bbutton.style.opacity = '0';
      this.overlay.style.left = '0px';
      this.overlay.style.top = '0px';
      //this.overlay.style.opacity = '1';
      // this.galleryGrid.style.opacity = '0';


      //add cursor hover classes
      this.overlay.classList.add('no-cursor')
      this.left.classList.add("left-arrow");
      this.right.classList.add("right-arrow");
      this.pic.classList.add("grid");
    }

  }

  closeLightbox() {
    this.lightboxFlag = false;
    this.overlay.style.opacity = "0";
    this.galleryGrid.style.opacity = "1";
    this.pic.classList.remove('zoomIn');
    this.bbutton.style.opacity = "1";
    //remove hover classes
    this.overlay.classList.remove("no-cursor");
    this.left.classList.remove("left-arrow");
    this.right.classList.remove("right-arrow");
    this.pic.classList.remove("grid");
    //zero gallery zoom
    this.fullWrapper.style.transform = `none`;

  }
  browseLeft(e) {
    console.log(this.picPointer)
    if (this.lightboxFlag) {
      if (this.picPointer >
        0) this.picPointer -= 1;
      let nextPic = this.array[this.picPointer];
      this.pic.srcset = nextPic.srcset;
      this.pic.src = nextPic.src;
      this.pic.dataset.id = nextPic.dataset.id
    }
  }
  browseRight(e) {
    if (this.lightboxFlag) {
      if (this.picPointer < this.array.length - 1) this.picPointer += 1;
      let nextPic = this.array[this.picPointer];
      this.pic.srcset = nextPic.srcset;
      this.pic.src = nextPic.src;
    }
  }
}
