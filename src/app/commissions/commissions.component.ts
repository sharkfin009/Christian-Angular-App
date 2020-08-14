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
  selector: "commissions",
  templateUrl: "./commissions.component.html",
  styleUrls: ["./commissions.component.css"],
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
export class CommissionsComponent implements AfterViewInit {
  @ViewChildren(GalleryThumbnailComponent, {
    read: ViewContainerRef,
  })
  thumbBoxes: QueryList < ViewContainerRef > ;
  thumbnails = [];
  prepClass = "";
  thumbLink = "/commission/"
  hoverEventObject = {
    hover: "",
    title: "",
    names: "",
  };

  previousScrollValue: Object;
  thumbnailsAllLoaded: any;
  elements: any;
  cachedFlag: boolean = false;
  spinner: any;

  constructor(
    private route: ActivatedRoute,
    private preloadGrids: GetGridService,
    private thumbnailsService: GetThumbnailsService
  ) {}

  hover(event: {
    hover: string;title: string;names: string;
  }) {
    this.hoverEventObject = event;
  }

  onScroll(event: {
    srcElement: {
      scrollTop: string;
    };
  }) {
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
        .getGrid("commission", thumbnail.slug)
        .subscribe((item) => {});
    });
  }

  ngAfterViewInit() {

    this.spinner = document.querySelector(".spinner-cursor");


    //animated load function

    let loadWithAnim = async () => {
      console.log("load with anim")
      this.thumbnails.forEach((item, index) => {
        let img = this.elements[index]._data.renderElement.children[0]
          .children[0];
        item.img = img;
        item.imgPromise = this.onload2Promise(img);
      });

      let recursive = (count: number) => {
        if (count === this.thumbnails.length - 1) {
          this.cacheGalleryMarkup();
          sessionStorage.setItem("commissions", "cached");
          this.spinner.style.display = "none";
          return;
        }

        //set src
         this.thumbnails[count].img.srcset = this.thumbnails[count].srcSet;
         this.thumbnails[count].img.src = this.thumbnails[count].urlStore;
        this.thumbnails[count].imgPromise.then((data: any) => {
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
    if (sessionStorage.getItem("commissions") === "cached") {
      this.thumbnailsService.getThumbnails("commissions").subscribe((thumbs) => {
        this.cachedFlag = true;
        this.thumbnails = thumbs;
        // reset scroll after render
        if (sessionStorage.getItem("scroll") && (sessionStorage.getItem("commissionsWhatLink") === "back" || sessionStorage.getItem("commissionsWhatLink") === "grid-lightbox")) {
          setTimeout(() => {
            this.previousScrollValue = sessionStorage.getItem("scroll");
          });
        }
        //   this.cacheGalleryMarkup();
      }, (error => {
        console.log(error)
      }));

      return;

    } else {
      //do consecutive load
      this.spinner.style.display = "block";
      this.prepClass = "prepareForAnim";
      this.thumbnailsService.getThumbnails("commissions").subscribe((thumbs) => {
        thumbs.forEach(item=>{
          item.urlStore = item.url;
          item.url="";

        })
        this.thumbnails = thumbs;
        this.thumbBoxes.changes.subscribe((item) => {
          this.elements = item.toArray();
          loadWithAnim();
        });
      }, (error => {
        console.log(error)
      }));
    }

  }
}
