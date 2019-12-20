import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: '´gallery-thumbnail',
  templateUrl: './gallery-thumbnail.component.html',
  styleUrls: ['./gallery-thumbnail.component.css']
})
export class GalleryThumbnailComponent implements OnInit {
  @Input() gallery:any;
  @Output() hoverEvent:any;

  isHidden:boolean = true;
  opacity:string ="o-100";
  constructor() { }

 hoverOver(){
  this.opacity="o-50"
  this.isHidden = false;

 }
 hoverOff(){
  this.opacity = "o-100"
  this.isHidden = true;
 }
  ngOnInit() {

  }

}
