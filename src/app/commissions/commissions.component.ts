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
  commissions: any;

  constructor(private route: ActivatedRoute, private getCommissions: GetCommissionsService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.commissions = this.route.snapshot.data['commissions'];
    this.commissions.forEach((item, index, array) => {
      array[index].sanitizedGrid=this.sanitizer.bypassSecurityTrustHtml(item);
    });
    console.dir(this.commissions);

  }

}
