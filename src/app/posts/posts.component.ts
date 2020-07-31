import {
  Component,
  OnInit
} from '@angular/core';
import {
  GetPostsService
} from '../shared/old/get-posts.service';

import {
  ActivatedRoute
} from '@angular/router';
import {
  DomSanitizer
} from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts=[];
  hoverClass="hoverOn"
  title:string;

  constructor(private route: ActivatedRoute, private getPosts: GetPostsService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.posts = this.route.snapshot.data['posts'];
    this.posts.forEach((item, index, array) => {
      array[index].sanitizedGrid=this.sanitizer.bypassSecurityTrustHtml(item.grid);
    });
  }
  ngAfterViewInit(){

  }
  hoverOn(title){

    this.hoverClass = "hoverOn";
    this.title = title;

  }
  hoverOff(){
    this.hoverClass = "hoverOff";
  }

}
