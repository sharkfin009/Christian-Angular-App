import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser'
import {
  GetGalleriesService
} from "../shared/getGalleries.service"

@Component({
  selector: '´gallery-thumbnail',
  templateUrl: './gallery-thumbnail.component.html',
  styleUrls: ['./gallery-thumbnail.component.css']
})
export class GalleryThumbnailComponent implements OnInit {
  galleries$ :any;
  gallery: any;
  gridIsPreloaded: boolean;
  @Input() thumbnail: any;
  @Input() hoverCompute: string;
  @Output() hover = new EventEmitter();
  @Output() loaded = new EventEmitter();
  hoverOnWithTitle = {};
  hoverOffWithTitle = {};
  titleFrame:any;
  thumbnailIsLoaded:boolean;
  //trustedGrid: any;

  constructor(private getGalleries:GetGalleriesService,private sanitizer:DomSanitizer) {}

  ngOnInit() {
    this.galleries$ = this.getGalleries.galleries$.subscribe(
      (galleries)=>{
        let gallery = galleries.find((gallery)=>
          gallery.slug === this.thumbnail.slug
         );
      this.gallery = gallery.grid;
      this.gridIsPreloaded = true;
      }
    );

  }
  ngAfterViewInit() {
    this.hoverOnWithTitle = {
      title: this.thumbnail.title,
      hover: "hoverOn",
      names:this.thumbnail.names,
    };
    this.hoverOffWithTitle = {
      title: this.thumbnail.title,
      hover: "hoverOff",
      names: this.thumbnail.names,
    }

  }

  hoverOn() {
    this.hover.emit(this.hoverOnWithTitle);
  }
  hoverOff() {
    this.hover.emit(this.hoverOffWithTitle);
  }
  hoverDecide(object) {
    if (this.thumbnail.title === object.title) {
      return "hoverOff";
    } else {
      return object.hover;
    }
  }


  thumbnailLoaded(){
    this.thumbnailIsLoaded=true;
  }


}
