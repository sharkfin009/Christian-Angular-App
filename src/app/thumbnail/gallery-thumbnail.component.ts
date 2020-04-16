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
} from '../shared/getGalleries.service';
import {
  Observable
} from 'rxjs';


@Component({
  selector: '´gallery-thumbnail',
  templateUrl: './gallery-thumbnail.component.html',
  styleUrls: ['./gallery-thumbnail.component.css']
})
export class GalleryThumbnailComponent implements OnInit {

  @Input() thumbnail: any;
  @Input() hoverCompute: string;
  @Output() hover = new EventEmitter();
  @Output() loaded = new EventEmitter();
  @Output() arrowClass = new EventEmitter();
  @Output() thumbLoaded = new EventEmitter();
  paleOnWithTitle = {};
  paleOffWithTitle = {};
  titleFrame: any;
  thumbnailIsLoaded: boolean;
  firstFourPics: any;
  observable$: any;
  url: String;


  constructor(private sanitizer: DomSanitizer, private gallery: GetGalleriesService) {}

  ngOnInit() {
    this.observable$ = this.gallery.getFirstFourPics(this.thumbnail.slug).subscribe(
      item => {
        this.firstFourPics = item;

      }
    );

  }
  ngAfterViewInit() {
    this.paleOnWithTitle = {
      title: this.thumbnail.title,
      hover: "paleOn",
      names: this.thumbnail.names,
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


  thumbnailLoaded() {
    this.thumbnailIsLoaded = true;
    this.thumbLoaded.emit(this.thumbnail.order_field);


  }



}
