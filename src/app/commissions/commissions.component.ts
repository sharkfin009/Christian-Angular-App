import {
  Component,
  OnInit
} from '@angular/core';
import {
  GetCommissionsService
} from '../shared/get-commissions.service';

import {
  ActivatedRoute
} from '@angular/router';
import {
  DomSanitizer
} from '@angular/platform-browser';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {
  commissions=[];
  hoverClass="hoverOn"
  title:string;

  constructor(private route: ActivatedRoute, private getCommissions: GetCommissionsService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.commissions = this.route.snapshot.data['commissions'];
    this.commissions.forEach((item, index, array) => {
      array[index].sanitizedGrid=this.sanitizer.bypassSecurityTrustHtml(item.grid);
    });
    console.dir(this.commissions);
  }
  ngAfterViewInit(){

  }
  hoverOn(title){
   
    this.hoverClass = "hoverOn";
    this.title = title;

  }
  hoverOff(){
    this.hoverClass = "hoverOff";
  }

}
