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
    selector: 'commission',
    templateUrl: './commission.component.html',
    styleUrls: ['./commission.component.css'],
  }

) export class CommissionComponent implements OnInit {
  commission: any;



  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['view'];
  }

 ngOnInit(){
//set up values
this.commission = this.route.snapshot.data['commission'];
console.dir(this.commission)
 }
}
