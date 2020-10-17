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
  header: any;
  gridCount: number=1;

  constructor(
    private route: ActivatedRoute,
    private preloadGrids: GetGridService,
    private thumbnailsService: GetThumbnailsService
  ) {}

  hover(event) {
  if (!window.matchMedia("(pointer:coarse)").matches){
    this.hoverEventObject = event;
  }
  }

  onScroll(event) {
    sessionStorage.setItem("scroll", event.srcElement.scrollTop);
  }

  resizePortFrame(){
    let portFrame :any = document.querySelector("#port-frame");
    portFrame.style.height = "400vh"
  }
  ngAfterViewInit() {

    this.spinner = document.querySelector(".spinner-cursor");
    this.spinner.style.display = "block";


    //animated load function

    let loadWithAnim = async () => {
      this.thumbnails.forEach((item, index) => {
        console.dir(this.elements)
        let img = this.elements[index]._data.renderElement.children[0].children[0];
        // let img = this.elements[index]._hostView[37]._ngEl.nativeElement.children[0].children[0]
        item.img = img;
      });

      let recursive = (count) => {
        console.log(count)
        if (count === this.thumbnails.length ) {
          console.log('full load')
          sessionStorage.setItem("portfolio", "cached");
          return;
        }
        if(count === 12){
          this.spinner.style.display = "none";
        }
        //set onload
        this.thumbnails[count].img.addEventListener('load',()=>{

            //get html for this thumb
            this.thumbnails[count].obs$ = this.preloadGrids
            .getGrid("gallery", this.thumbnails[count].slug)
            .subscribe(
              (item)=>{console.log("this:",item);
              this.thumbnails[count].img.style.opacity = "1";
           // this.thumbnails[count].img.style.transform = "translateY(0px)";

            }
            );
            recursive(count+1);

        },false)
        //set src
        this.thumbnails[count].img.src = this.thumbnails[count].url;

      };
      recursive(0);
    };

    //check if this is not first time. if not, load instantly from cache so that route animation looks good
    //so if cache is there, skip consecutive load and animation
    if (sessionStorage.getItem("portfolio") === "cached") {
     this.subscription =  this.thumbnailsService.getThumbnails("portfolio").subscribe((thumbs) => {
      this.spinner.style.display = "none";
        this.thumbnails = thumbs.filter(item=>item.slug!=="overview");
        this.thumbnails.forEach((item)=>{
          item.src = item.url;
        })
        

        // reset scroll after render
        if (sessionStorage.getItem("scroll") &&
         (sessionStorage.getItem("portfolioWhatLink") === "back" || sessionStorage.getItem("portfolioWhatLink")==="grid-lightbox")) {
          let portFrame :any = document.querySelector("#port-frame");
          portFrame.style.height = "400vh";
          setTimeout(() => {
            this.previousScrollValue = sessionStorage.getItem("scroll");
          },1001);



      setTimeout(()=>{
        portFrame.style.height = "100vh";
      },1000)

        }
      });

      return;

    } else {
      //do consecutive load
      //this.spinner.style.display = "block";
      this.prepClass = "prepareForAnim";
     this.subscription = this.thumbnailsService.getThumbnails("portfolio").subscribe((thumbs) => {

        this.thumbnails = thumbs.filter(item=>item.slug!=="overview");
        console.dir(this.thumbnails)
        this.thumbBoxes.changes.subscribe((item) => {
          this.elements = item.toArray();
          console.log(this.thumbBoxes.length)
            loadWithAnim();

        });
      });
    }

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
