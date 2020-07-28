import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  ViewContainerRef,
  TemplateRef
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

import {
  GetThumbnailsService
} from "../shared/getThumbnails.service"

import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import {
  GetPreloadPicsService
} from '../shared/getPreloadPics.service';
import {
  Observable
} from 'rxjs';
import {
  isNgTemplate
} from '@angular/compiler';
import {
  GalleryThumbnailComponent
} from '../thumbnail/gallery-thumbnail.component';


@Component({
  selector: "portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChildren(GalleryThumbnailComponent, {
    read: ViewContainerRef,
  })
  thumbBoxes: QueryList < ViewContainerRef > ;
  thumbnails = [];
  prepClass = "";
  hoverEventObject = {
    hover: "",
    title: "",
    names: "",
  };
  @Output() arrowClass = new EventEmitter();

  previousScrollValue: Object;
  thumbnailsAllLoaded: any;
  elements: any;
  cachedFlag: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private preloadPics: GetPreloadPicsService,
    private thumbnailsService: GetThumbnailsService
  ) {}

  hover(event) {
    this.hoverEventObject = event;
  }

  onScroll(event) {
    sessionStorage.setItem("scroll", event.srcElement.scrollTop);
  }

  onload2Promise(obj) {
    return new Promise((resolve, reject) => {
      obj.onload = () => resolve(obj);
      obj.onerror = reject;
    });
  }

  cacheGalleryMarkup() {
    this.thumbnails.forEach((thumbnail) => {
      thumbnail.obs$ = this.preloadPics
        .getFirstFourPics(thumbnail.slug)
        .subscribe((item) => {});
    });
  }

  ngAfterViewInit() {


    //animated load function

    let loadWithAnim = async () => {
      this.thumbnails.forEach((item, index) => {
        let img = this.elements[index]._data.renderElement.children[0]
          .children[0];
        item.img = img;
        item.imgPromise = this.onload2Promise(img);
      });
      console.dir(this.thumbnails);

      let recursive = (count) => {
        if (count === this.thumbnails.length-1) {
          console.log("recursive done");
          this.cacheGalleryMarkup();
          return;
        }
        //set src
        this.thumbnails[count].img.src = this.thumbnails[count].url;
        this.thumbnails[count].imgPromise.then((data) => {
          this.thumbnails[count].img.style.opacity = "1";
          this.thumbnails[count].img.style.transform = "translateY(0px)";
          count++;
          recursive(count);
        });
      };
      recursive(0);
    };

    //check if this is not first time. if not, load instantly from cache so that route animation looks good
    //so if cache is there, skip consecutive load and animation
    if (sessionStorage.getItem("firstLoad") === "no") {
      this.thumbnailsService.getThumbnails().subscribe((thumbs) => {
        this.cachedFlag = true;
        this.thumbnails = thumbs;
        // this.thumbnails.forEach(item=>{
        //   item.picSrc = item.url
        // })
        console.log("not first time - thumbnails:", this.thumbnails);
        // reset scroll after render
        if (sessionStorage.getItem("scroll")) {
          console.log(sessionStorage.getItem("scroll"));
          setTimeout(() => {
            console.log(sessionStorage.getItem("scroll"));
            this.previousScrollValue = sessionStorage.getItem("scroll");
          });

        }
        this.cacheGalleryMarkup();
      });

      return;

    } else {
             sessionStorage.setItem("firstLoad", "no");
             this.thumbnails.forEach(item=>{
               item.picSrc = item.url;
              item.url = "";
             })
             this.prepClass = "prepareForAnim";
             console.log("first time");
             this.thumbnailsService.getThumbnails().subscribe((thumbs) => {
               this.thumbnails = thumbs;
               this.thumbBoxes.changes.subscribe((item) => {
                 this.elements = item.toArray();
                 loadWithAnim();
               });
             });
           }

  }
}
