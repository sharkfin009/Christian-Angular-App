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
  lightboxesObs: any;
  galleryGrid: any;
  picsArray: any[];
  bigPicArray:any;
  overlay: any;
  pic: any;
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

  constructor(private pullLightboxes: GetLightboxesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

  }


  ngOnInit(): void {
    //set up values
    this.grids = this.route.snapshot.data['grids'];
    this.getGalleryName(this.route.snapshot.params['slug']);
    this.lightboxesObs = this.pullLightboxes.getLightboxes(this.slug);

    this.lightboxesObs.subscribe({
      next: item => item.forEach(lightbox => {
        let LightboxPreload = document.createElement("DIV");
        LightboxPreload.innerHTML = lightbox.grid;
        let obj = {
          LightboxPreload: LightboxPreload,
          slug: lightbox.slug
        }
        this.lightboxes.push(obj);
      })
    });

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
    this.lightbox = document.querySelector('#lightbox');
    this.galleryGrid = document.querySelector('#galleryGrid');
    this.bbutton = document.querySelector("#bbutton");
    this.overlay = document.querySelector("#overlay");
    this.pic = document.querySelector("#pic");
    this.left = document.querySelector("#left");
    this.right = document.querySelector("#right");
    this.fullWrapper = document.querySelector(".full-wrapper");
    this.header = document.querySelector(".header");
    //make Array of img's
    this.picsArray = this.galleryGrid.querySelectorAll('img');
    //set event listener
    this.picsArray.forEach((item, index) => {
      item.setAttribute("data-id", index);
      item.addEventListener("click", this.showLightbox.bind(this), true);
    });
    this.left.addEventListener("click", this.browseLeft.bind(this), true);
    this.right.addEventListener("click", this.browseRight.bind(this), true);
  }

  getLightboxGrid(alt) {
    let id = alt.slice(alt.length - 2);
    let linkedLightbox = this.lightboxes.find(lightbox => lightbox.slug.slice(lightbox.slug.length - 2) === id);
    return linkedLightbox
  }
  cumulativeOffset(element) {
    let top = 0,
      left = 0,
      i = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
      i++;
    } while (i <= 4);

    return {
      top: top,
      left: left
    };
  };

  showLightbox(event) {
      this.lightboxFlag = true;
      this.picPointer = parseInt(event.target.dataset.id);
      // get the event targets shape and position in viewport

      let zoomTargetPos = this.cumulativeOffset(event.target);
      let unzoomedLeft = zoomTargetPos.left;
      let unzoomedTop = zoomTargetPos.top;
      let unzoomedWidth = event.target.offsetWidth;
      let unzoomedHeight = event.target.offsetHeight;

      // work out 80% height and resultant width
      let ratio = unzoomedWidth / unzoomedHeight;
      let centerHeight = window.innerHeight * 0.8;
      let centerWidth = Math.floor(centerHeight * ratio);

      // work out  top and left values for fixed lightbox in the center
      let centerLeft = (window.innerWidth / 2 - centerWidth / 2);
      let centerTop = (window.innerHeight / 2 - centerHeight / 2);


      //work out gallery top and left and width values for zoomed position

      let galleryOffset = this.header.offsetHeight;
      let picWidthRatio = centerWidth / unzoomedWidth;
      let unzoomedMiddleX = unzoomedLeft + unzoomedWidth / 2;
      let unzoomedMiddleY = unzoomedTop + unzoomedHeight / 2;
      let centerMiddleX = centerLeft + centerWidth / 2;
      let centerMiddleY = centerTop + centerHeight / 2 - galleryOffset;
      let picZoomedLeftDiffX = centerMiddleX - unzoomedMiddleX - window.innerWidth * 0.15;
      let picZoomedTopDiffY = centerMiddleY - unzoomedMiddleY + window.scrollY;

      // change element properties to trigger galleryGrid's zoom transition
      this.galleryGrid.style.transformOrigin = `${unzoomedMiddleX}px ${unzoomedMiddleY}px`;
      this.galleryGrid.style.transform = `scale(${picWidthRatio},${picWidthRatio})`;
      this.galleryGrid.style.left = picZoomedLeftDiffX + 'px';
      this.galleryGrid.style.top = picZoomedTopDiffY + "px";

      //place lightbox in center of fixed overlay
      this.lightbox.style.left = centerLeft + "px";
      this.lightbox.style.top = centerTop + "px";
      this.lightbox.style.width = centerWidth + 'px';

      //fade in overlay and fade out gallery with css transition
      this.bbutton.style.opacity = '0';
      this.overlay.style.left = '0px';
      this.overlay.style.top = '0px';
      //setTimeout(()=>{this.overlay.hidden="false"},300)

      //add cursor hover classes
      this.overlay.classList.add('no-cursor')
      this.left.classList.add("left-arrow");
      this.right.classList.add("right-arrow");
      this.lightbox.classList.add("grid");

      //check for lightbox grid
      let check = this.getLightboxGrid(event.target.alt);
      if (check) {
        this.lightbox.appendChild(check.LightboxPreload);
      } else {
        this.pic.src = event.target.src;
        this.pic.srcset = event.target.srcset;
      }

  }
  browseLeft(e) {

    if (this.lightboxFlag) {

      if (this.picPointer > 0) this.picPointer -= 1;
      this.nextPic = this.picsArray[this.picPointer];
      this.pic.srcset = this.nextPic.srcset;
      this.pic.src = this.nextPic.src;
      this.resetAndScrollToBrowsedImage(this.nextPic)
     // this.galleryGrid.style.opacity = 0;
    }
  }
  browseRight(e) {
    if (this.lightboxFlag) {
      if (this.picPointer < this.picsArray.length - 1)
        this.picPointer += 1;
      this.nextPic = this.picsArray[this.picPointer];
      this.pic.srcset = this.nextPic.srcset;
      this.pic.src = this.nextPic.src;
      this.resetAndScrollToBrowsedImage(this.nextPic);
  

    }
  }
  resetAndScrollToBrowsedImage(nextPic) {
    this.galleryGrid.style.transform = `none`;
    this.galleryGrid.style.left = '0';
    this.galleryGrid.style.top = '0';
    window.scroll(0, 0);
    let y = nextPic.getBoundingClientRect().top;
    window.scroll(0, y - (window.innerHeight / 2) + nextPic.height / 2);
  }
  closeLightbox(e) {
    this.lightboxFlag = false;
    this.bbutton.style.opacity = "1";

    //remove hover classes
    this.overlay.classList.remove("no-cursor");
    this.left.classList.remove("left-arrow");
    this.right.classList.remove("right-arrow");
    this.lightbox.classList.remove("grid");
    //zero gallery zoom
    this.galleryGrid.style.transform = `none`;
    this.galleryGrid.style.left = '0';
    this.galleryGrid.style.top = '0';
    if (this.nextPic === undefined){
    this.overlay.display = "none";
    this.timeOut("notBrowsed")}
    if (this.nextPic !== undefined) {
      this.zoomOutFromLightboxBrowsed()
      this.timeOut("browsed");
    }

  }
timeOut(flag){
  setTimeout(() => {
    // remove LightboxDiv
    let lightboxGrid = this.lightbox.querySelector('lightbox-grid');
    if (lightboxGrid) lightboxGrid.parentNode.removeChild(lightboxGrid);
    //empty pic
    this.pic.src = "";
    this.pic.srcset = "";
    //reset lightbox
    this.lightbox.style.transform = "none"
    //clear NextPic
    this.nextPic = undefined;
    if (flag="browsed"){
    } else {

    }
   // this.galleryGrid.style.opacity = "1";
  //  this.overlay.style.opacity = "0";

  }, 300)
};
  zoomOutFromLightboxBrowsed() {
    //zoom Lightbox down to NextPic
    let zoomTarget = this.nextPic.getBoundingClientRect();
    let lightboxOrigin = this.lightbox.getBoundingClientRect();
    let zoomRatio = zoomTarget.width / lightboxOrigin.width;
    let lightboxOriginCenter = {
      x: lightboxOrigin.left + lightboxOrigin.width / 2,
      y: lightboxOrigin.top + lightboxOrigin.height / 2,
    };
    let zoomTargetCenter = {
      x: zoomTarget.left + zoomTarget.width / 2,
      y: zoomTarget.top + zoomTarget.height / 2
    }

    let diffX = zoomTargetCenter.x - lightboxOriginCenter.x;
    let diffY = zoomTargetCenter.y - lightboxOriginCenter.y;
    this.lightbox.style.transformOrigin = `${lightboxOriginCenter.x}px ${lightboxOriginCenter.y}px`;
    this.lightbox.style.left = `${diffX}px`;
    this.lightbox.style.top = `${diffY}px`;
    this.lightbox.style.transform = `scale(${zoomRatio},${zoomRatio})`;

  }
}
