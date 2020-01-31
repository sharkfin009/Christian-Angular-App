import { Component ,OnInit} from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import {  slider } from './route-animations'
import { menuAnim } from './menuAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slider,menuAnim ]
})
export class AppComponent {
  isCollapsed:boolean = false;
  menuButton: any;
  constructor(){}
  prepareRoute(outlet: RouterOutlet ) {
    return outlet.activatedRouteData['view']||"portfolio";
  }

  ngAfterViewInit(){
    this.menuButton = document.querySelector('[data-menu-button]')
  }
onActivate(component){
  this.isCollapsed=false;
  this.rotateX(this.isCollapsed)
}
toggleMenu(){
 
  this.isCollapsed=!this.isCollapsed;
  this.rotateX(this.isCollapsed)
}
  rotateX(val){
    if (val){
      this.menuButton.style.transform = "rotate(45deg)";
    } else {
      this.menuButton.style.transform = "rotate(0deg)";
    }
  }

}


