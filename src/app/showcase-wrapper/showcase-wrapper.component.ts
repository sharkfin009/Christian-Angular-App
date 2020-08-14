import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'showcase-wrapper',
  templateUrl: './showcase-wrapper.component.html',
  styleUrls: ['./showcase-wrapper.component.css']
})
export class ShowcaseWrapperComponent implements OnInit {
  spinner: any;

  constructor(private router:Router ) { }

  ngOnInit() {
    this.router.navigate(['/','showcase'])
    this.spinner = document.querySelector(".spinner-cursor");
    this.spinner.style.display ="block";
  }

}
