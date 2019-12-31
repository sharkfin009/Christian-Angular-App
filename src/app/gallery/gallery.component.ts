import {
  Component,
  OnInit,

} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser'
import {
  ActivatedRoute,
} from '@angular/router';
import {
  GetLightboxesService
} from '../shared/getLightboxes.service';
import {
  map,
  shareReplay,
} from 'rxjs/operators';



@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  grids: any[];
  grid: string;
  slug: string;
  trustedGrid: SafeHtml;
  lightboxes: any;

  constructor(private pullLightboxes: GetLightboxesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}


  ngOnInit(): void {
    this.grids = this.route.snapshot.data['grids'];
    this.getGalleryName(this.route.snapshot.params['slug']);
    this.trustedGrid = this.sanitizer.bypassSecurityTrustHtml(this.grid);
    this.preloadLightboxes();
  }

  getGalleryName(slug: string): void {
    console.log(slug);
    console.log(this.grids)
    let gallery = this.grids.find((gallery) => gallery.slug === slug);
    this.slug = gallery.slug;
    this.grid = gallery.grid;
  }

  preloadLightboxes() {
    this.pullLightboxes.getLightboxes(this.slug).subscribe(item => item);
  }

  ngAfterViewInit() {
    let slug = this.slug;
    this.pullLightboxes.getLightboxes(this.slug).pipe(
      map(
        // add lightbox functionality
        lightboxes => {
          let galleryGrid = document.querySelector('#galleryGrid');
          let array = galleryGrid.querySelectorAll('img.q');
            array.forEach(item => {
            addEventListener("click", showLightbox, true);
          });
          let lightbox = document.querySelector('#lightbox');
          let x = document.querySelector('#close');
          let overlay= document.querySelector("#overlay");
          let bbutton = document.querySelector("#bbutton");


          function showLightbox(event) {

            if (event.target.classList[0] === "q"
            && event.target.alt !== "") {
              //set transform origin to mouseclick pos
              let y = event.screenY.toString();
              let x = event.screenX.toString();
              let xPerc =(Math.floor(y/window.innerHeight  * 100)).toString();
              let yPerc =(Math.floor(x/window.innerWidth * 100)).toString();
              //lightbox.style=`transform-origin:${xPerc}% ${yPerc}%`;
              console.log(lightbox);

              //access and place correct lightbox grid
              let altText = event.target.alt;
              let id = altText.slice(altText.length - 2);
              let linkedLightbox = lightboxes.find(lightbox => lightbox.slug.slice(lightbox.slug.length - 2) === id);
              if (linkedLightbox) {
                lightbox.innerHTML = linkedLightbox.grid;
              }
              //fade in overlay and fade out gallery
              overlay.className = "absolute bg-white fixed top-0 left-0 w-100 h-100 ph3   fadeIn";      
              galleryGrid.className = "fadeOut";
           
              // get mouse position and place lightbox
              lightbox.className = " zoomIn fadeIn";
              bbutton.className = "z-1 tc fa fa-angle-right fa-2x black-70 hover-black-50 pointer fadeOut";
            }
          }

          x.addEventListener("click", closeLightbox);
          function closeLightbox(){
            //lightbox.style=`transform-origin:50% 50%`;
            
            bbutton.className = "z-1 tc fa fa-angle-right fa-2x black-70 hover-black-50 pointer fadeIn";
            overlay.className = "absolute bg-white fixed left-0 top-0  w-100 h-100 ph3   fadeOut";
            lightbox.className = "zoomOut fadeOut";
            galleryGrid.className="fadeIn";
          }

        }

      ),
      shareReplay(1),
    ).subscribe();
  }



}
