import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'showcase-wrapper',
  templateUrl: './showcase-wrapper.component.html',
  styleUrls: ['./showcase-wrapper.component.css']
})
export class ShowcaseWrapperComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit() {
    this.router.navigate(['/','show-case'])
  }

}
