import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showcaseLink="/showcase";
  aboutLink="/about";
  constructor() {}

  ngOnInit() {
    if (sessionStorage.getItem("showcase") === "cached"){
      this.showcaseLink = "/show-case";
    };
    if(sessionStorage.getItem('about') ==="cached"){
      this.aboutLink = "/aboutInner"
    }
    var uLinkAttr = 'data-underlined-link';
    var uLinks = document.querySelectorAll('li');
    for (var u = 0; u < uLinks.length; u++) {
      uLinks[u].setAttribute(uLinkAttr, uLinks[u].innerText);

    };
  }

}
