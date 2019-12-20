import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  fader } from './route-animations'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
    // slider,
    // transformer,
    // stepper
  ]
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view']||"portfolio";
  }

}

