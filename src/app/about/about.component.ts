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
    view: any;

    constructor(private route: ActivatedRoute, private getGrid: GetGridService) {}

    ngOnInit(): void {
      this.getGrid.getGrid("about").subscribe(item => {
        this.aboutGrid = item;
        console.log(this.aboutGrid)
      })
      this.view = this.route.snapshot.data.view;
      sessionStorage.setItem("about", "cached");
    }
    ngAfterViewInit() {}
}
