import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-wrapper',
  templateUrl: './gallery-wrapper.component.html',
  styleUrls: ['./gallery-wrapper.component.css']
})
export class GalleryWrapperComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit() {
    this.router.navigate(['/gallery','/showcase'])
  }

}
