import {
  Component,
  OnInit
} from '@angular/core';
import {
  GetCommissionsService
} from '../shared/get-commissions.service';

import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  DomSanitizer
} from '@angular/platform-browser';
import {
  isNgTemplate
} from '@angular/compiler';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css'],
})
export class CommissionsComponent implements OnInit {
  layout: any;
  sanitizedLayout: any;
  hoverClass = "hoverOn"
  title: string;
  thumbs: any;
  images: any;
  preloadDiv: HTMLDivElement;
  preloadImage: HTMLImageElement;
  thumbnailsAllLoaded: boolean;

  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
    this.layout = this.route.snapshot.data['commissions'];
    this.sanitizedLayout = this.sanitizer.bypassSecurityTrustHtml(this.layout.grid);
    console.log(this.layout.srcUrls[0])
    this.preloadDiv = document.createElement("div");
    for (let i = 0; i < this.layout.srcUrls.length; i++) {
      this.preloadImage = new Image;
      this.preloadImage.id = "pic" + i;
      this.preloadDiv.appendChild(this.preloadImage);
    };
  }

  loadLoop(counter): void {
    //break out if no more images
    if (counter === this.layout.srcUrls.length) {
      this.thumbnailsAllLoaded = true;

      return
    }
    //grab an image object
    let img = < HTMLImageElement > this.preloadDiv.querySelector("#pic" + counter);
    img.onload = () => {
      this.images[counter].src = this.layout.srcUrls[counter];
      this.images[counter].style.opacity = 1;
      this.images[counter].style.transform = "translateY(0)";
      this.loadLoop(counter + 1)
    }
    //load image
    img.src = this.layout.srcUrls[counter];
 //   console.log(counter);
  };

  ngAfterViewInit() {
    this.thumbs = document.querySelector("#thumbs");
    this.images = this.thumbs.querySelectorAll(".q");
    this.images.forEach((item, index) => {

      item.onclick = function () {
        this.router.navigate(["/commission", this.layout.names[index]], {
          relativeTo: this.route
        });
      }.bind(this)
    })
    this.loadLoop(0);



  }
  hoverOn() {
    this.hoverClass = "hoverOn";;
  }
  hoverOff() {
    this.hoverClass = "hoverOff";
  }

}
