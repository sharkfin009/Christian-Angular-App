import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,

} from '@angular/core';
import {
  ActivatedRoute,
} from '@angular/router';
import {
  WpRESTmoduleService
} from '../shared/wp_rest_module.service';
import {
  timer
} from 'rxjs'

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', ]
})
export class GalleryComponent {
  galleries: any;
  galleryContent: string;
  title: string
  picsArray = [];

  constructor(private route: ActivatedRoute, private wpREST: WpRESTmoduleService) {}

  ngOnInit(): void {
    this.galleries = this.route.snapshot.data['galleries']
    this.getGallery(this.route.snapshot.params['title']);
    this.getPicUrls();
  }

  getGallery(title: string): void {
    let gallery = this.galleries.find((gallery) => gallery.title === title);
    this.galleryContent = gallery.content;
    this.title = gallery.title;
  }
  getPicUrls() {
    let parser = new DOMParser;
    let doc = parser.parseFromString(this.galleryContent, 'text/xml');
    let imgElements = doc.querySelectorAll("img");
    for(let i=0;i<=8;i++){
      this.picsArray.push(imgElements[i].getAttribute("data-full-url"))
    }
    console.log(doc)
    console.dir(this.picsArray)
  }
}
