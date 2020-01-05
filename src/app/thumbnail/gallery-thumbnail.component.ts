import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: '´gallery-thumbnail',
  templateUrl: './gallery-thumbnail.component.html',
  styleUrls: ['./gallery-thumbnail.component.css']
})
export class GalleryThumbnailComponent implements OnInit {
  @Input() gallery:any;
  thumbnail:any;
  title:any;
  thumbnailClass:string = "";
  titleClass:string="";
  
  constructor() { }
  
  ngAfterViewInit(){
    //setup DOM values
    this.title = document.querySelector('.title');
    this.thumbnail = document.querySelector('.thumbnail')
  }

 hoverOn(){
  this.thumbnailClass = "thumbnailHoverOn";
  this.titleClass = "titleHoverOn"
 }
 hoverOff(){
  this.thumbnailClass = "thumbnailHoverOff";
  this.titleClass = "titleHoverOff";
 }
  ngOnInit() {

  }
  

}
