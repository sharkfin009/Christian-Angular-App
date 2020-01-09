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
  header: any;
  background: any;
  lightboxDiv: any;
  lightboxesObs: any;
  lightboxes =[];

  constructor(private pullLightboxes: GetLightboxesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

  }


  ngOnInit(): void {
    //set up values
    this.grids = this.route.snapshot.data['grids'];
    this.lightboxes = this.route.snapshot.data['lightboxes'];
    this.getGalleryName(this.route.snapshot.params['slug']);
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.grid);
    this.lightboxesObs = this.pullLightboxes.getLightboxes(this.slug);

    this.lightboxesObs.subscribe({
      next: item => item.forEach(lightbox => {
         let preload = document.createElement("div");
         preload.innerHTML = lightbox.grid;
         let obj = {
           preload: preload,
           slug: lightbox.slug
         }
         this.lightboxes.push(obj);
      })
    });
  }

  getGalleryName(slug: string): void {
    let gallery = this.grids.find((gallery) => gallery.slug === slug);
    this.slug = gallery.slug;
    this.grid = gallery.grid;
  }


  ngAfterViewInit() {
    //set up DOM values
    this.lightboxDiv = document.querySelector('#lightbox');
    this.galleryGrid = document.querySelector('#galleryGrid');
    this.bbutton = document.querySelector("#bbutton");
    this.overlay = document.querySelector("#overlay");
    this.pic = document.querySelector("#pic");
    this.left = document.querySelector("#left");
    this.right = document.querySelector("#right");
    this.fullWrapper = document.querySelector(".full-wrapper");
    this.header = document.querySelector(".header");
    this.background = document.querySelector("#background");
    //make array of img's
    this.array = this.galleryGrid.querySelectorAll('img');
    this.galleryGrid.style.transform = `none`;
    this.galleryGrid.style.left = '0';
    this.galleryGrid.style.top = '0';
    //set event listener
    this.array.forEach((item, index) => {
      item.setAttribute("data-id", index);
      item.addEventListener("click", this.showLightbox.bind(this), true);

      // preload all imgs in cache
      let preload = document.createElement('img');
      preload.srcset = item.srcset;
      preload.src = item.src;
      preload.width = window.innerWidth;
    });
    this.left.addEventListener("click", this.browseLeft.bind(this), true);
    this.right.addEventListener("click", this.browseRight.bind(this), true);
  }

  getLightboxGrid(alt) {
    //access and place correct lightbox grid
    let id = alt.slice(alt.length - 2);
    let linkedLightbox = this.lightboxes.find(lightbox => lightbox.slug.slice(lightbox.slug.length - 2) === id);
    return linkedLightbox;
    }



  showLightbox(event) {

    if (event.target.classList[0] === "q") {
      this.lightboxFlag = true;
      this.picPointer = parseInt(event.target.dataset.id);
      // get the event targets shape and position in viewport
      let cumulativeOffset = function (element) {
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
      let zoomTargetPos = cumulativeOffset(event.target);
      let unzoomedLeft = zoomTargetPos.left;
      let unzoomedTop = zoomTargetPos.top;
      let unzoomedWidth = event.target.offsetWidth;
      let unzoomedHeight = event.target.offsetHeight;

      // work out 80% height and resultant width
      let ratio = unzoomedWidth / unzoomedHeight;
      let centerHeight = window.innerHeight * 0.8;
      let centerWidth = centerHeight * ratio;

      // work out div top and left values for pic in the center
      let centerLeft = (window.innerWidth / 2 - centerWidth / 2);
      let centerTop = (window.innerHeight / 2 - centerHeight / 2);
      let galleryOffset = this.header.offsetHeight;

      //work out gallery top and left and width values for zoomed position

      let picWidthRatio = centerWidth / unzoomedWidth;
      let unzoomedMiddleX = unzoomedLeft + unzoomedWidth / 2;
      let unzoomedMiddleY = unzoomedTop + unzoomedHeight / 2;
      let centerMiddleX = centerLeft + centerWidth / 2;
      let centerMiddleY = centerTop + centerHeight / 2 - galleryOffset;
      let picZoomedLeftOffset = centerMiddleX - unzoomedMiddleX - window.innerWidth * 0.15;
      let picZoomedTopOffset = centerMiddleY - unzoomedMiddleY + window.scrollY;

      console.log(
        `picZoomedLeftOffset:${picZoomedLeftOffset},pixZoomedTopOffset:${picZoomedTopOffset}\n`,
        `unzoomedLeft:${unzoomedLeft},unzoomedTop:${unzoomedTop}\n`,
        `unzoomedMiddleX:${unzoomedMiddleX},unzoomedMiddleY:${unzoomedMiddleY}\n`);

      // change element properties to trigger outermost div's parallel zoom transition
      this.galleryGrid.style.transformOrigin = `${unzoomedMiddleX}px ${unzoomedMiddleY}px`;
      this.galleryGrid.style.transform = `scale(${picWidthRatio},${picWidthRatio})`;
      this.galleryGrid.style.left = picZoomedLeftOffset + 'px';
      this.galleryGrid.style.top = picZoomedTopOffset + "px";

      //place div in center of fixed overlay
      this.lightboxDiv.style.left = centerLeft + "px";
      this.lightboxDiv.style.top = centerTop + "px";
      this.lightboxDiv.style.width = centerWidth + 'px';

      //fade in overlay and fade out gallery with css transition
      this.bbutton.style.opacity = '0';
      this.overlay.style.left = '0px';
      this.overlay.style.top = '0px';
      this.background.style.left="0";
      this.background.style.top="0";
      this.background.classList.add('fade');
      setTimeout(() => {
          this.background.style.opacity = "1";
          this.pic.style.opacity = "1";
        },
        400);


      //add cursor hover classes
      this.overlay.classList.add('no-cursor')
      this.left.classList.add("left-arrow");
      this.right.classList.add("right-arrow");
      this.lightboxDiv.classList.add("grid");

      //build copy of event target in the fixed parent div using the #pic div

        //check for lightbox grid
        let check = this.getLightboxGrid(event.target.alt);
        if (check){
          this.lightboxDiv.appendChild(check.preload);
          console.log(check)
        } else {
          this.pic.src = event.target.src;
          this.pic.srcset = event.target.srcset;
          console.log('no lightbox grid')
        }
    }

  }

  closeLightbox() {
    this.lightboxFlag = false;
    this.bbutton.style.opacity = "1";
    //remove hover classes
    this.overlay.classList.remove("no-cursor");
    this.left.classList.remove("left-arrow");
    this.right.classList.remove("right-arrow");
    this.lightboxDiv.classList.remove("grid");
    //zero gallery zoom
    this.galleryGrid.style.transform = `none`;
    this.galleryGrid.style.left = '0';
    this.galleryGrid.style.top = '0';
    this.background.classList.remove('fade')
    this.background.style.opacity = "0";
    this.pic.style.opacity = "0";
    let div = this.lightboxDiv.querySelector('div');
    console.log(div);
    div.parentNode.removeChild(div);
    this.pic.src = "";
    this.pic.srcset = "";

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
      console.log(this.picPointer);
      if (this.picPointer < this.array.length - 1) this.picPointer += 1;
      let nextPic = this.array[this.picPointer];
      this.pic.srcset = nextPic.srcset;
      this.pic.src = nextPic.src;
    }
  }
}
