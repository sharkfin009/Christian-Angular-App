import { Component, OnInit } from '@angular/core';
import { LightboxService } from '../shared/lightbox.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit {
  lightboxes$ = this.pullLightboxes.lightboxes$;
  constructor( private pullLightboxes:LightboxService) { }

  ngOnInit() {
    
  }

}
