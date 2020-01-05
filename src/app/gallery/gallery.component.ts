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
    //make array of img's
    this.array = this.galleryGrid.querySelectorAll('img');
    //set event listeners
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
      let left = (viewportOffset.left);
      let top = (viewportOffset.top);
      let width = event.target.offsetWidth;
      let height = event.target.offsetHeight;


      //build copy of event target in the fixed parent div using the #pic div

      this.pic.src = event.target.src;
      this.pic.srcset = event.target.srcset;
      this.pic.dataset.id = event.target.dataset.id

      // work out 70% height and resultant width
      let ratio = width / height;
      let centerHeight = window.innerHeight * 0.8;
      let centerWidth = Math.floor(centerHeight * ratio);


      // work out div top and left values for enlarged div in the center
      let divLeftCenter = (window.innerWidth / 2 - centerWidth / 2);
      let divTopCenter = (window.innerHeight / 2 - centerHeight / 2);

      //place div in center mr venter
      this.pic.style.left = divLeftCenter + "px";
      this.pic.style.top = divTopCenter + "px";
      this.pic.style.width = centerWidth + 'px';




      //pass in css variables and add class to trigger chosen pic's zoom animation
      this.pic.style.setProperty('--left', left + "px");
      this.pic.style.setProperty('--top', top + "px");
      this.pic.style.setProperty('--width', width + 'px');
      this.pic.style.setProperty('--leftCenter', divLeftCenter + "px");
      this.pic.style.setProperty('--topCenter', divTopCenter + "px");
      this.pic.style.setProperty('--widthCenter', centerWidth + 'px');
      this.pic.classList.add('zoomIn');

      //work out gallery top and left and width values for zoomed position
      let galleryWidth = this.galleryGrid.offsetWidth;
      let galleryHeight = this.galleryGrid.offsetHeight;
      let widthRatio = centerWidth / width;
      let heightRatio = centerHeight / height;
      let picZoomedTopOffset = divTopCenter - top;
      let picZoomedLeftOffset = divLeftCenter - left;
      let picCenterX = left + width/2 ;
      let picCenterY = top + height/2;
      let originX =  picCenterX/this.galleryGrid.offsetWidth *100;
      let originY = picCenterY/this.galleryGrid.offsetHeight *100;
      // console.log(`origin x${originX}% origin y${originY}%`);
      console.log("widthRatio:"+widthRatio,"heightRatio:"+heightRatio)

      // change element properties to trigger gallery's parallel zoom transition
      this.galleryGrid.style.transformOrigin = `${originX}% ${originY}%`;
      this.galleryGrid.style.transform = `scale(${widthRatio},${heightRatio})`;
      // this.galleryGrid.style.left = galleryZoomedLeft.toString() + 'px';
      // this.galleryGrid.style.top = galleryZoomedTop.toString() + "px";



      //fade in overlay and fade out gallery with css transition
      this.bbutton.style.opacity = '0';
      this.overlay.style.left = '0px';
      this.overlay.style.top = '0px';
      this.overlay.style.opacity = '1';
      this.galleryGrid.style.opacity = '0';


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
    this.galleryGrid.style.transform = `none`;

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
