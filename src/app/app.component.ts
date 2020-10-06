import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ɵConsole,
  Input
} from '@angular/core';
import {
  Title, Meta
} from '@angular/platform-browser'
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

import FontFaceObserver from "fontfaceobserver";
import {
  filter,
  pairwise,
  map
} from 'rxjs/operators';



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
        transform: "translateY(200vh)"
      })),
      transition('true=>false', [animate('0.6s 0.8s ease-in')]),
      transition('false=>true', [animate('0.8s ease-out')])
    ]),
    trigger('slideX', [
      state('true', style({
        transform: "translateY(-100vh)"
      })),
      state('false', style({
        transform: "translateY(0)"
      })),
      transition('true=>false', [animate('0.2s 0.8s ease-out')]),
      transition('false=>true', [animate('0.8s ease-out')])
    ]),
    trigger('xTurn', [
      state('true', style({
        transform: "rotate(-45deg)"
      })),
      state('false', style({
        transform: "rotate(0deg)"
      })),

      transition('true=>false', [animate('0.5s ease-out')]),
      transition('false=>true', [animate('0.5s ease-out')])
    ]),
    trigger('showtime', [
      state('initial', style({
        opacity: "0"
      })),
      state('final', style({
        opacity: "1"
      })),
      transition('initial=>final', [animate('1s ease-out')]),
    ]),
  ]
})

export class AppComponent implements OnInit {
  XXHaasObserver: any;
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
  showTime = {
    state: "initial"
  };
  @Input('thumbs') thumbStore = [];
  lastRoute: any;
  backArrowLink: any;
  url: any;
  spinnerCursor: any;
  spinFlag: false;
  backArrowLinkBackup: any;
  view: string;
  constructor(private route: ActivatedRoute, private router: Router, public location: Location) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }

  ngOnInit() {
    // this.view = this.route.snapshot.data.view;
    this.XXHaasObserver = new FontFaceObserver('XXHaas');
    this.XXHaasObserver.load().then(() => {
      this.showTime.state = "final";
    });
    this.x = document.querySelector(".menu-button");
    this.router.events.subscribe((data => {
      if (data instanceof RoutesRecognized) {
        this.activeRouteTitle = data.state.root.firstChild.data.title;

      }
    }));
    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {


        this.backArrowLink = this.router.url
      });
  }

  ngAfterViewInit() {

    this.spinnerCursor = document.querySelector(".spinner-cursor");
    window.addEventListener("mousemove", (e) => {
      this.spinnerCursor.style.left = e.pageX + "px";
      this.spinnerCursor.style.top = e.pageY + "px";
    });




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
      //set SS values to track how we got to showcase and portfolio
      if (this.lastRoute === "/showcase") {
        sessionStorage.setItem("lastRoute", "showcase")
        sessionStorage.setItem("showcaseWhatLink", "back")
      }
      if (this.lastRoute === "/portfolio") {
        sessionStorage.setItem("lastRoute", "portfolio")
        sessionStorage.setItem("portfolioWhatLink", "back")
      }
      if (this.lastRoute === "/about") {
        sessionStorage.setItem("lastRoute", "about")
        sessionStorage.setItem("aboutWhatLink", "back")
      }
      this.location.back();
    }

  }



}
