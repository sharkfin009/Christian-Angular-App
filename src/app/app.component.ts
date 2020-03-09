import { Component ,OnInit} from '@angular/core';
import { RouterOutlet,RouterModule, ActivatedRoute } from '@angular/router';
import {  slider } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider]
})
export class AppComponent {
  outlet:any;
  menuButton:any;
  headerElement :any;
  isCollapsed: boolean = false;
  constructor(private location: Location) {}
  prepareRoute(outlet: RouterOutlet) {

    return outlet.activatedRouteData['view'] || "portfolio";
  }

  ngAfterViewInit() {
    this.headerElement=document.querySelector('[data-header]')
    let offset = this.headerElement.offsetHeight;
    this.outlet=document.querySelector('#outlet-wrapper');
   this.outlet.style.marginTop=`13%`;
  }

  // goBack(){
  //   this.location.back();
  //    this.menuButton = document.querySelector('.menu-button');
  //   this.menuButton.style.classList= "menu-button-over-Z"
  // }


}

