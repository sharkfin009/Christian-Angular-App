import {
  Component,
  OnInit
} from '@angular/core';
import {
  GetCommissionsService
} from '../shared/get-commissions.service';

import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  DomSanitizer
} from '@angular/platform-browser';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {
  layout:any;
  sanitizedLayout:any;
  hoverClass="hoverOn"
  title:string;
  thumbs: any;
  images: any;

  constructor(private route: ActivatedRoute, 
    private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
    this.layout = this.route.snapshot.data['commissions'];
   this.sanitizedLayout=this.sanitizer.bypassSecurityTrustHtml(this.layout.grid);

  }

  ngAfterViewInit(){
    this.thumbs = document.querySelector("#thumbs");
    this.images = this.thumbs.querySelectorAll(".q");


    this.images.forEach((item,index)=>{

      item.src = this.layout.srcUrls[index];

      item.style.opacity = 1;
       //item.style.transform = "translateY(0)";
      item.onclick = function(){
        this.router.navigate(["/commission",this.layout.names[index]],
        {relativeTo:this.route}
        );
      }.bind(this)
    })

  }
  hoverOn(){
    this.hoverClass = "hoverOn";
;
  }
  hoverOff(){
    this.hoverClass = "hoverOff";
  }

}
