import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  formFlag: boolean = false;

  constructor() {}

  ngOnInit() {}
  showForm() {
    this.formFlag = true;
  }
  closeForm(delayFlag) {
    console.log(delayFlag)
    if (delayFlag === "smallDelay") {
      setTimeout(() => {
        this.formFlag = false;
      }, 1000)
    } else {
      this.formFlag = false;
    }
  }
}

