import {
  Component,
  OnInit
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml
} from '@angular/platform-browser'
import {
  ActivatedRoute,
} from '@angular/router';
import {
  WpRESTmoduleService
} from '../shared/wp_rest_module.service' ;

@Component({
  selector: 'app-grid-gallery',
  templateUrl: './grid-gallery.component.html',
  styleUrls: ['./grid-gallery.component.css']
})
export class GridGalleryComponent implements OnInit {
  galleries: any;
  title: string;
  grid: string;
  imageCache: any;
  trustedGrid: SafeHtml;
  constructor(private route: ActivatedRoute,private wpREST: WpRESTmoduleService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.galleries = this.route.snapshot.data['galleries']
    this.getGallery(this.route.snapshot.params['title']);
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.imageCache);
  }

  getGallery(title: string): void {
   let gallery = this.galleries.find((gallery) => gallery.title === title);
   this.title = gallery.title;
   this.grid = gallery.grid;
   this.imageCache = gallery.pictures
    console.dir(this.grid)
  }
}
