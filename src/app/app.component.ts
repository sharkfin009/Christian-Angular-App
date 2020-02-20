import { Component ,OnInit} from '@angular/core';
import { RouterOutlet,RouterModule, ActivatedRoute } from '@angular/router';
import {  slider } from './route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slider ]
})
export class AppComponent {
  pageTitle: any;
  constructor(private route:ActivatedRoute){}
  prepareRoute(outlet: RouterOutlet ) {
    return outlet.activatedRouteData['view']||"portfolio";
  }
  ngOnInit(){
    this.pageTitle = this.route.snapshot;
    console.dir(this.pageTitle);
  }
  hoverOver(){
    console.log('over')
  }

}

