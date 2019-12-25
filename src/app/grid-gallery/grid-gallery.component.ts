import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle
} from '@angular/platform-browser'
import {
  ActivatedRoute,
} from '@angular/router';
import {
  WpRESTmoduleService
} from '../shared/wp_rest_module.service';
import {
  PortfolioComponent
} from "../portfolio/portfolio.component";
import { LightboxService } from '../shared/lightbox.service'


@Component({
  selector: 'app-grid-gallery',
  templateUrl: './grid-gallery.component.html',
  styleUrls: ['./grid-gallery.component.css']
})
export class GridGalleryComponent implements OnInit {
  grids: any;
  grid:string;
  title: string;
  style: any;
  trustedGrid: SafeHtml;
  trustedStyle: SafeStyle;
  lightboxes$ = this.pullLightboxes.lightboxes$
  constructor(private pullLightboxes: LightboxService ,private route: ActivatedRoute, private wpREST: WpRESTmoduleService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.grids = this.route.snapshot.data['grids']
    this.getGallery(this.route.snapshot.params['title']);
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.grid);
    this.trustedStyle = this.sanitizer.bypassSecurityTrustStyle(this.style);
    this.pullLightboxes.setGalleryName(this.title);
  }

  getGallery(title: string): void {
    let gallery = this.grids.find((gallery) => gallery.title === title);
    this.title = gallery.title;
    this.style = gallery.style;
    this.grid = gallery.grid;
  }
}
