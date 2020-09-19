import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
}

from '@angular/core';

import {
  DomSanitizer,
  SafeHtml,
}

from '@angular/platform-browser'

import {
  RouterOutlet,
  Router,
  RoutesRecognized,
  ActivatedRoute,
}

from '@angular/router';





import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';



@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css'],


  }

) export class GalleryComponent implements OnInit {
  gallery: any;
  view: any;



  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }

 ngOnInit(){
//set up values
this.gallery = this.route.snapshot.data['gallery'];
this.view = this.route.snapshot.data.view;
 }

}
