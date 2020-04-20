import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  GetGalleriesService
} from '../shared/getGalleries.service';

import {
  GetThumbnailsService
} from "../shared/getThumbnails.service"

import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';


@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],

})

export class PortfolioComponent implements OnInit {

  thumbnails = [];
  hoverEventObject = {
    hover: "",
    title: '',
    names: "",
  };
  @Output() arrowClass = new EventEmitter();
  picArray = [];

  preloadImage: any;
  preloadDiv: HTMLDivElement;
  imgs: NodeListOf < HTMLImageElement > ;
  index: number;

  thumbnailsAllLoaded: any;

  constructor(private route: ActivatedRoute, public getThumbnails: GetThumbnailsService, private galleries:GetGalleriesService ) {}

  ngOnInit(): void {
    this.thumbnails = this.route.snapshot.data["thumbnails"];
    this.preloadDiv = document.createElement("div");
    for (let i= 0;i< this.thumbnails.length; i++){
      this.thumbnails[i].showFlag = false;
      this.preloadImage= new Image;
      this.preloadImage.id="pic"+i;
      this.preloadDiv.appendChild(this.preloadImage);
    }
    //subscribe to get four pics per gallery
    this.thumbnails.forEach((thumbnail)=>{
      thumbnail.obs$ = this.galleries.getFirstFourPics(thumbnail.slug).subscribe(
        array => {
          thumbnail.fourPics = array;
        thumbnail.done = true;
        }
      );

    })
    console.dir(this.thumbnails)
    this.loadLoop(0);
  };
  loadLoop(counter): void {
    //break out if no more images
    if (counter === this.thumbnails.length) {
      this.thumbnailsAllLoaded = true;
    
      return
    }
    //grab an image object
    let img = < HTMLImageElement > this.preloadDiv.querySelector("#pic" + counter);
    this.thumbnails[counter].loadedUrl=this.thumbnails[counter].url
    img.onload =  () =>{
      this.thumbnails[counter].showFlag = true;
      this.loadLoop(counter + 1)
    }
    //load image
    img.src = this.thumbnails[counter].url;
  }


  hover(event) {
    this.hoverEventObject = event;

  };



}
