import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ɵConsole,
  Input
} from '@angular/core';
import {
  RouterOutlet,
  Router,
  RoutesRecognized,
  ActivatedRoute
} from '@angular/router';
import {
  slider
} from './route-animations'
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import {
  Location
} from "@angular/common";
import { GetThumbnailsService } from './shared/getThumbnails.service';
import FontFaceObserver from "fontfaceobserver";
import { GetCommissionsService } from './shared/get-commissions.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider,
    trigger('arrow', [
      state('true', style({
        transform: "translateY(0)"
      })),
      state('false', style({
        transform: "translateY(100vh)"
      })),
      transition('true=>false', [animate('0.8s ease-out')]),
      transition('false=>true', [animate('0.8s ease-out')])
    ]),
    trigger('slideX', [
      state('true', style({
        transform: "translateY(-50vh)"
      })),
      state('false', style({
        transform: "translateY(0)"
      })),
      transition('true=>false', [animate('0.8s ease-out')]),
      transition('false=>true', [animate('0.8s ease-out')])
    ]),
    trigger('xTurn', [
      state('true', style({
        transform: "rotate(-45deg)"
      })),
      state('false', style({
        transform: "rotate(0)"
      })),

      transition('true=>false', [animate('0.8s ease-out')]),
      transition('false=>true', [animate('0.8s ease-out')])
    ]),
    trigger('showtime', [
      state('initial', style({
        opacity: "0"
      })),
      state('final', style({
        opacity: "1"
      })),
      transition('initial=>final', [animate('2s ease-out')]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  XXHaasObserver:any;
  outlet: any;
  menuButton: any;
  headerElement: any;
  isCollapsed: boolean = false;
  activeRouteTitle: any;
  menuClass = {
    hideX: 'db',
  };
  class: String;
  x: any;
  hideMenuClass: string;
  fullWrapper: any;
  showTime = {state:"initial"};
  @Input('thumbs') thumbStore=[];
  constructor(private route: ActivatedRoute, private router: Router, public location: Location, private thumbs: GetThumbnailsService,private getCommissions: GetCommissionsService,) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }
  ngOnInit() {
    this.XXHaasObserver = new FontFaceObserver('XXHaas');
    this.XXHaasObserver.load().then( ()=> {
      this.showTime.state = "final";
    });
    this.x = document.querySelector(".menu-button");
    this.router.events.subscribe((data => {
      if (data instanceof RoutesRecognized) {
        this.activeRouteTitle = data.state.root.firstChild.data.title;

      }
    }));
    //get thumbnails
    this.thumbs.getThumbnails().subscribe();
     this.getCommissions.getCommissionsThumbnailLayout().subscribe(
      (obj)=>{
        let url = obj.srcUrls[0];
        let img1 = document.createElement('img');
        img1.src = url;
      }
    )
  }
  ngAfterViewInit() {
    // this.fullWrapper = document.querySelector("#fullWrapper");
    // this.fullWrapper.style.opacity = 1;


  }


  onActivate(componentReference) {

    if (componentReference.route !== undefined && componentReference.route.component.name === "GalleryComponent") {
      componentReference.headerClass.subscribe((data) => {
        this.class = data;
      });
    }
  }

  getArrowState(outlet) {
    if (outlet.activatedRouteData.arrowState === undefined) {
      return false
    } else return outlet.activatedRouteData['arrowState']
  }

  getSlideXState(outlet) {
    if (outlet.activatedRouteData.slideXState === undefined) {
      return false
    } else return outlet.activatedRouteData.slideXState
  }

  getXTurnState(outlet) {
    if (outlet.activatedRouteData.xTurnState === undefined) {
      return false
    } else return outlet.activatedRouteData.xTurnState
  }

  toggleMenu(outlet) {
    if (outlet.activatedRouteData['view'] !== "menu") {
      this.router.navigate(["../menu"], {
        relativeTo: this.route
      });
    } else {
      this.location.back();
    }
  }



}
