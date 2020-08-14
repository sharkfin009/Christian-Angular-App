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
  map,
  shareReplay,
  timeout,
}

from 'rxjs/operators';

import {
  Observable
}

from 'rxjs';
import {
  doesNotThrow
} from 'assert';
import {
  Grid
} from '../shared/interfaces';
import {
  isNgTemplate
} from '@angular/compiler';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';
import {
  THIS_EXPR
} from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.css'],



  }

) export class ShowcaseComponent implements OnInit {
  showcaseGrid: any;
  view:any;
  spinner: any;


  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    //set up values
    this.view = this.route.snapshot.data.view;
    this.showcaseGrid = this.route.snapshot.data['showCaseGrid'];

    sessionStorage.setItem("showcase","cached")

    this.spinner = document.querySelector(".spinner-cursor");
    this.spinner.style.display ="none";
  }
}
