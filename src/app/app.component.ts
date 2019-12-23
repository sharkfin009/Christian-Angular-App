import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  slider } from './route-animations'
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { GridCallService } from './shared/grid-call.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slider ]
})
export class AppComponent {
  constructor(private gridCall: GridCallService,){}
  prepareRoute(outlet: RouterOutlet ) {
    return outlet.activatedRouteData['view']||"portfolio";
  }
}

