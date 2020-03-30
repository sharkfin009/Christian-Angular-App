import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { RouterOutlet, Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { slider } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider],
})
export class AppComponent implements OnInit{
  outlet:any;
  menuButton:any;
  headerElement :any;
  isCollapsed: boolean = false;
  activeRouteTitle: any;
  turnClass={
    x:"",
    menu:"",
    outlet:"",
  };

  toggle=false;

  constructor( private route: ActivatedRoute, private router: Router) {
  }
  prepareRoute(outlet: RouterOutlet) {
    return  outlet.activatedRouteData['view'];
  }
  ngOnInit(){
    this.router.events.subscribe((data =>{
      if (data instanceof RoutesRecognized){
        this.activeRouteTitle = data.state.root.firstChild.data.title;
      }
    }))
  }

  ngAfterViewInit() {
  }

  clickX(){
   this.toggle=!this.toggle;

    if (this.toggle){
      this.turnClass.x = "x-turn";
      this.turnClass.menu = "menu-slide-in";
      this.turnClass.outlet ="outlet-slide";
  }
    if (!this.toggle){
      this.turnClass.x="";
      this.turnClass.menu="";
      this.turnClass.outlet="";
    };
  }

}

