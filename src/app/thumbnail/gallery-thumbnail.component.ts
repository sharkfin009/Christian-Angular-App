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
  @Output() arrowClass = new EventEmitter();
  paleOnWithTitle = {};
  paleOffWithTitle = {};
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
    this.paleOnWithTitle = {
      title: this.thumbnail.title,
      hover: "paleOn",
      names:this.thumbnail.names,
    };
    this.paleOffWithTitle = {
      title: this.thumbnail.title,
      hover: "paleOff",
      names: this.thumbnail.names,
    }

  }

  hoverOn() {
    this.hover.emit(this.paleOnWithTitle);
  }
  hoverOff() {
    this.hover.emit(this.paleOffWithTitle);
  }
  hoverDecide(object) {
    if (this.thumbnail.title === object.title) {
      return "paleOff";
    } else {
      return object.hover;
    }
  }


  thumbnailLoaded(){
    this.thumbnailIsLoaded=true;
  }



}
