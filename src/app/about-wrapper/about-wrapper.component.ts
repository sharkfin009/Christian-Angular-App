import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'about-wrapper',
  templateUrl: './about-wrapper.component.html',
  styleUrls: ['./about-wrapper.component.css']
})
export class AboutWrapperComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit() {
    this.router.navigate(['/','about'])
    sessionStorage.setItem("aboutFirstTime","true")
  }

}
