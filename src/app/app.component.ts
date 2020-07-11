import { Component ,OnInit} from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import {  slider } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slider ]
})
export class AppComponent {
  constructor(){}
  prepareRoute(outlet: RouterOutlet ) {
    return outlet.activatedRouteData['view']||"portfolio";
  }
  hoverOver(){
    console.log('over')
  }

}

