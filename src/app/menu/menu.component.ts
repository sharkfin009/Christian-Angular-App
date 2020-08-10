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
  showcaseLink="/showcase-no-resolver";
  aboutLink="/about-no-resolver";
  constructor() {}

  ngOnInit() {
  //set SS values to track how we got to showcase and portfolio
    if (sessionStorage.getItem("showcase") === "cached"){
      this.showcaseLink = "/showcase";
      sessionStorage.setItem("showcaseWhatLink","menu")
    };
    if (sessionStorage.getItem("portfolio") === "cached"){
      sessionStorage.setItem("portfolioWhatLink","menu")
    };
    if (sessionStorage.getItem("commissions") === "cached"){
      sessionStorage.setItem("commissionsWhatLink","menu")
    };


    if(sessionStorage.getItem('about') ==="cached"){
      this.aboutLink = "/about"
    }
    var uLinkAttr = 'data-underlined-link';
    var uLinks = document.querySelectorAll('li');
    for (var u = 0; u < uLinks.length; u++) {
      uLinks[u].setAttribute(uLinkAttr, uLinks[u].innerText);

    };
  }

}
