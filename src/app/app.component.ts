import {
  Component,
  OnInit,
  EventEmitter,
  Output
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
import { trigger, state, transition, animate, style } from '@angular/animations';
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider,
    trigger('arrow', [
      state('true', style({transform:"translateX(0)"})),
      state('false', style({transform:"translateX(-150px)"})),
      transition('true=>false', [ animate('0.5s ease-out')]),
      transition('false=>true', [ animate('0.5s ease-out')])
    ]),
    trigger('hideX',[
      state('true', style({opacity:"0"})),
      state('false', style({opacity:"100"})),
      transition('true=>false',[animate('0.5s ease-out')]),
      transition('false=>true',[animate('0.5s ease-out')])
    ]),
    trigger('xTurn',[
      state('true', style({transform:"rotate(-45deg)"})),
      state('false', style({transform:"rotate(0)"})),
      transition('true=>false',[animate('0.5s ease-out')]),
      transition('false=>true',[animate('0.5s ease-out')])
    ]),
  ],
})
export class AppComponent implements OnInit {
  outlet: any;
  menuButton: any;
  headerElement: any;
  isCollapsed: boolean = false;
  activeRouteTitle: any;
  menuClass = {
    x: "",
    menu: "",
    outlet: "",
    hideX: 'db',
  };
  class: String;


  x: any;
  hideMenuClass: string;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }
  ngOnInit() {
    this.x = document.querySelector(".menu-button");
    this.router.events.subscribe((data => {
      if (data instanceof RoutesRecognized) {
        this.activeRouteTitle = data.state.root.firstChild.data.title;

      }
    }));
  }

  ngAfterViewInit() {}



  onActivate(componentReference) {

    if (componentReference.route !==undefined &&componentReference.route.component.name === "GalleryComponent") {
      componentReference.headerClass.subscribe((data) => {
        this.class = data;
      });

    }
  }

  getArrowState(outlet){
    return outlet.activatedRouteData['arrowState']
  }
  getXState(outlet){
    return outlet.activatedRouteData['xState']
  }
  toggleMenu(outlet){

 if(outlet.activatedRouteData['view']!=="menu"){
  this.router.navigate(["../menu"],{relativeTo:this.route});
 }
 else {
  this.location.back();
 }
  }

}
