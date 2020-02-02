import {
  Component,
  OnInit
} from '@angular/core';
import {
  RouterOutlet,
  RouterModule
} from '@angular/router';
import {
  slider
} from './route-animations'
import {
  menuAnim
} from './menuAnimation';
import {
  Location
} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider, menuAnim]
})
export class AppComponent {
  headerElement :any;
  isCollapsed: boolean = false;
  constructor(private location: Location) {}
  prepareRoute(outlet: RouterOutlet) {

    return outlet.activatedRouteData['view'] || "portfolio";
  }

  ngAfterViewInit() {
    this.headerElement=document.querySelector('[data-header]')
    let offset = this.headerElement.offsetHeight;
    let outlet=document.querySelector('#outlet-wrapper');
   outlet.style.marginTop=`13%`
  }

  goBack(){
    this.location.back();
    let menuButton = document.querySelector('.menu-button');
    menuButton.style.classList= "menu-button-over-Z"
  }


}

