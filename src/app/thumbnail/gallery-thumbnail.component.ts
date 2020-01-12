import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';


@Component({
  selector: '´gallery-thumbnail',
  templateUrl: './gallery-thumbnail.component.html',
  styleUrls: ['./gallery-thumbnail.component.css']
})
export class GalleryThumbnailComponent implements OnInit {
  @Input() gallery: any;
  @Input() hoverCompute: string;
  @Output() hover = new EventEmitter();
  hoverOnWithTitle = {};
  hoverOffWithTitle = {};
  titleFrame:any;

  constructor() {}

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.hoverOnWithTitle = {
      title: this.gallery.title,
      hover: "hoverOn"
    };
    this.hoverOffWithTitle = {
      title: this.gallery.title,
      hover: "hoverOff"
    }

  }

  hoverOn() {
    this.hover.emit(this.hoverOnWithTitle);
    console.log('on')
  }
  hoverOff() {
    this.hover.emit(this.hoverOffWithTitle);
  }
  hoverDecide(object) {
    if (this.gallery.title === object.title) {
      return "hoverOff";
    } else {
      return object.hover;
    }
  }


}
