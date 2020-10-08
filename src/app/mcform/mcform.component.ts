import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';


@Component({
  selector: 'app-mcform',
  templateUrl: './mcform.component.html',
  styleUrls: ['./mcform.component.css']
})
export class MCFormComponent implements OnInit {
  @Output() submitFlag = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  submitClick(){
    this.submitFlag.emit("smallDelay")

  }

}
