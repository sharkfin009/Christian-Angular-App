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
      selector: 'contact',
      templateUrl: './contact.component.html',
      styleUrls: ['./contact.component.css'],
    }

  ) export class contactComponent implements OnInit {
    contactGrid: {};
    view: any;

    constructor(private route: ActivatedRoute, private getGrid: GetGridService) {}

    ngOnInit(): void {
      this.getGrid.getGrid("contact").subscribe(item => {
        this.contactGrid = item;
        console.log(this.contactGrid)
      })
      this.view = this.route.snapshot.data.view;
      sessionStorage.setItem("contact", "cached");
    }
    ngAfterViewInit() {}
}
