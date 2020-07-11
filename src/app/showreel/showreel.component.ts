import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showreel',
  templateUrl: './showreel.component.html',
  styleUrls: ['./showreel.component.css']
})
export class ShowreelComponent implements OnInit {
  defaultImaj = 'https://www.placecage.com/1000/1000';
  one="https://source.unsplash.com/user/erondu";
  two="https://source.unsplash.com/Gkc_xM3VY34/1600X900";
  three="https://source.unsplash.com/JYvWlLREwBk/1600X900";
  four="https://source.unsplash.com/d9KHXXjJR54/1600X900";
  constructor() { }

  ngOnInit() {
  }

}
