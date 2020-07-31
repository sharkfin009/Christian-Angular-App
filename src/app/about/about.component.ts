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
import {
  GetGridService
} from '../shared/getGrid.service';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
  }

) export class AboutComponent implements OnInit {
  aboutGrid: {};

  constructor(private route: ActivatedRoute ) {}



  ngOnInit(): void {
    this.aboutGrid = this.route.snapshot.data['aboutGrid'];

  }






}
