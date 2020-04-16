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
  animations: [
    trigger('simpleFadeAnimation', [
      state('false', style({
        opacity: 0,
        // transform: 'scale(0.95,0.95)'
      })),
      state('true', style({
        opacity: 1,
        // transform: 'scale(1,1)'
      })),
      transition('false=>true', [
        style({
          opacity: 0,
          // transform: 'scale(0.95,0.95)'
        }),
        animate("0.5s ease-in")
      ]),
    ])
  ]
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
  portfolioRow: any;

  rowLoadCounter = {};
  preloadDiv: HTMLDivElement;
  imgs: NodeListOf < HTMLImageElement > ;
  preloadRow: HTMLDivElement;
  index: number;

  constructor(private route: ActivatedRoute, public getThumbnails: GetThumbnailsService, ) {}

  ngOnInit(): void {
    this.thumbnails = this.route.snapshot.data["thumbnails"];

    // console.log(this.thumbnails)
    let remainder = this.thumbnails.length % 3;
    for (let i = 0; i < this.thumbnails.length / 3; i++) {
      this.rowLoadCounter["row" + i] = [];
    }
    //event handler to fade in orws once they have loaded 3 images
    let loadEvents = function (e) {
      let currentTarget = e.currentTarget
      this.rowLoadCounter[currentTarget.id].push('loaded')
      this.rowLoadCounter[currentTarget.id].rowFadeIn = false;
      if (this.rowLoadCounter[currentTarget.id].length === 3) {
        this.rowLoadCounter[currentTarget.id].rowFadeIn = true;
      }
    }
    console.dir(this.rowLoadCounter);

    //create preload div
    this.preloadDiv = document.createElement("div");
    //iterate across thumbnails and make array of rows
    this.index = 0;
    for (let i = 0; i < this.thumbnails.length / 3; i++) {
      //make subArray
      this.picArray[i] = new Array();
      // make row div
      this.preloadRow = document.createElement("div");
      //put an id on the row div with the row no on it
      this.preloadRow.id = "row" + [i].toString();
      //add eventlistener to row div
      this.preloadRow.addEventListener('load', loadEvents.bind(this), true)
      //add row into preload div
      this.preloadDiv.appendChild(this.preloadRow);
      //make loop which builds picarray with row subarrays

      for (let j = 0; j < 3; j++) {
        this.picArray[i].push(this.thumbnails[this.index + j])
        //create img
        let preloadImg = document.createElement("img");
        preloadImg.id = "img" + (this.index + j).toString();
        // add to row
        this.preloadRow.appendChild(preloadImg);
      }
      this.index += 3;

    }
    this.imgs = this.preloadDiv.querySelectorAll("img");

    this.loadLoop(0);
  };
  loadLoop(counter): void {
    //break out if no more images
    if (counter === this.thumbnails.length) {
      return
    }
    //grab an image object
    let img = < HTMLImageElement > this.preloadDiv.querySelector("#img" + counter);

    img.onload =  () =>{
      this.loadLoop(counter + 1)
    }
    img.src = this.thumbnails[counter].url;
  }





  hover(event) {
    this.hoverEventObject = event;

  };

  showRow(row) {
    console.log(row);
  }


}
