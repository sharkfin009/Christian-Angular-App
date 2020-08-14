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
  GetGridService
} from '../shared/getGrid.service';

import {
  GalleryThumbnailComponent
} from '../thumbnail/gallery-thumbnail.component';


@Component({
  selector: "portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
  animations: [
    trigger('simpleFadeAnimation', [
      state('false', style({
        opacity: 0,
      })),
      state('true', style({
        opacity: 1,
      })),
      transition('false=>true', [
        style({
          opacity: 0,
        }),
        animate("3s ease-in")
      ]),
    ])
  ]
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
  thumblink = "/gallery/"

  previousScrollValue: Object;
  thumbnailsAllLoaded: any;
  elements: any;
  cachedFlag: boolean = false;
  subscription: any;
  spinner: any;

  constructor(
    private route: ActivatedRoute,
    private preloadGrids: GetGridService,
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
      thumbnail.obs$ = this.preloadGrids
        .getGrid("gallery", thumbnail.slug)
        .subscribe((item) => {});
    });
  }

  ngAfterViewInit() {

    this.spinner = document.querySelector(".spinner-cursor");
    this.spinner.style.display = "block";


    //animated load function

    let loadWithAnim = async () => {
      this.thumbnails.forEach((item, index) => {
        let img = this.elements[index]._data.renderElement.children[0]
          .children[0];
        item.img = img;
        // item.imgPromise = this.onload2Promise(img);
      });

      let recursive = (count) => {
        if (count === this.thumbnails.length - 1) {
          this.cacheGalleryMarkup();
          sessionStorage.setItem("portfolio", "cached");
          return;
        }
        if(count === 4){
          this.spinner.style.display = "none";
        }
        //set onload
        this.thumbnails[count].img.addEventListener('load',()=>{
            this.thumbnails[count].img.style.opacity = "1";
            this.thumbnails[count].img.style.transform = "translateY(0px)";
            recursive(count+1);

        },false)
        //set src
        this.thumbnails[count].img.src = this.thumbnails[count].urlStore;

      };
      recursive(0);
    };

    //check if this is not first time. if not, load instantly from cache so that route animation looks good
    //so if cache is there, skip consecutive load and animation
    if (sessionStorage.getItem("portfolio") === "cached") {
     this.subscription =  this.thumbnailsService.getThumbnails("portfolio").subscribe((thumbs) => {
      this.spinner.style.display = "none";
        this.thumbnails = thumbs;

        // reset scroll after render
        if (sessionStorage.getItem("scroll") &&
         (sessionStorage.getItem("portfolioWhatLink") === "back" || sessionStorage.getItem("portfolioWhatLink")==="grid-lightbox")) {
          setTimeout(() => {
            this.previousScrollValue = sessionStorage.getItem("scroll");
          });
        }
        this.cacheGalleryMarkup();
      });

      return;

    } else {
      //do consecutive load
      //this.spinner.style.display = "block";
      this.prepClass = "prepareForAnim";
     this.subscription = this.thumbnailsService.getThumbnails("portfolio").subscribe((thumbs) => {
        thumbs.forEach(item=>{
          item.urlStore = item.url;
          item.url="";
          item.srcSet = "";
        })
        this.thumbnails = thumbs;
        this.thumbBoxes.changes.subscribe((item) => {
          this.elements = item.toArray();
          loadWithAnim();
        });
      });
    }

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
