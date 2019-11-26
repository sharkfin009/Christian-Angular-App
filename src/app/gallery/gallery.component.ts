import { Component,  Input, Output , EventEmitter} from '@angular/core';



@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css',]
})
export class GalleryComponent  {
  @Input() galleryTitle
  @Output() eventClick = new EventEmitter()
  handleClick(){
    this.eventClick.emit("boo");
  }
  constructor() { }

  ngOnInit() {
  }
  logFoo(){
    console.log("foo");
  }


}
