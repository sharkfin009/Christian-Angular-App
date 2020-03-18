import { Component ,OnInit} from '@angular/core';
import { RouterOutlet,Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import {  slider } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider, ]
})
export class AppComponent implements OnInit{
  outlet:any;
  menuButton:any;
  headerElement :any;
  isCollapsed: boolean = false;
  activeRouteTitle: any;

  constructor( private route: ActivatedRoute, private router: Router) {

  }
  prepareRoute(outlet: RouterOutlet) {

    return outlet.activatedRouteData['view'] || "portfolio";
  }
  ngOnInit(){
    this.router.events.subscribe((data =>{
      if (data instanceof RoutesRecognized){
        this.activeRouteTitle = data.state.root.firstChild.data.title;
        console.dir(this.activeRouteTitle);
      }
    }))
  }
  ngAfterViewInit() {


    this.headerElement=document.querySelector('[data-header]')
    //let offset = this.headerElement.offsetHeight;
  //   this.outlet=document.querySelector('#outlet-wrapper');
  //  this.outlet.style.marginTop=`13%`;
  }




}

