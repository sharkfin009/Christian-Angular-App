import {
  Component,
  OnInit
} from '@angular/core';
import {
  Gallery
} from './shared/gallery';
import {
  Populate
} from './shared/galleryPull.service';
import {
  WikiPixService
} from './shared/wiki-pix.service';

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  galleries: any
  pictures: any
  constructor(private wikiPixPull: WikiPixService, private getGals: Populate ){

  }

  ngOnInit():void{
   this.getGals.getGalleries().subscribe(
     {next: galleries => this.galleries = galleries}
   );
    this.wikiPixPull.getPix().subscribe(
    {next: picUrls => {
      this.pictures = picUrls;
    console.dir(this.galleries);
    console.dir(this.pictures)}

    });
  }
}



