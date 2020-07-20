import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import {
  shareReplay, map
} from 'rxjs/operators';
import { Post } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  private apiUrl = "http://wpbackend.dreamhosters.com/index.php/wp-json/getPosts/v1/please";
  posts$: Observable < Post[] >
    constructor(private http: HttpClient) {
      this.storePosts();
    }
  storePosts() {
    this.posts$ = this.getPosts();
  }
  getPosts():Observable<Post[]>{
    return this.http.get < Post[] > (this.apiUrl)
     .pipe(
       map(posts =>
         posts.map(post => {
           let gridLoaded = document.createElement('div');
           gridLoaded.innerHTML = post.grid;
           let flexString = " .lg-column-wrap{display:-webkit-flex;display:-ms-flexbox;display:flex;}.lg-align-middle{-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;position:relative;} .lg-col{position:relative;display:inline-block;z-index:1;pointer-events:auto;}  .lg-column-wrap{position:relative;width:100%;z-index:1;pointer-events:none;}.lg-row-inner{width:100%;position:relative;}.lg-type-img{position:relative;}.lg-placeholder > *{position:absolute;top:0;left:0;width:100%;height:100%;}.lg-placeholder{position:relative;}";
           let animString = "@keyframes fadeInUp {from{opacity: 1;transform: translate3d(0, 150%, 0);}to{opacity: 1;transform: translate3d(0, 0, 0);}}.q{}";
           let mobileQuery = "@media (max-width: 700px){.lg-desktop-grid .lg-col{width:100%;transform:none!important;-webkit-transform:none!important;}.lg-desktop-grid.lg-grid{padding-top:5vw;padding-bottom:5vw;}.lg-desktop-grid .lg-row{padding-left:5vw;padding-right:5vw;}.lg-desktop-grid .lg-col{margin-bottom:5vw;}.lg-desktop-grid .lg-row:last-child .lg-col:last-child{margin-bottom:0;} }";
           let style = flexString + animString + mobileQuery + gridLoaded.querySelector('style').innerHTML;
           let imgElements = gridLoaded.querySelectorAll("img");
           imgElements.forEach(item => {
             item.className += "q pointer zoomTarget";
           })
           gridLoaded.querySelector('style').innerHTML = style;

           return {
             slug: post.slug,
             grid: gridLoaded.innerHTML,
            title: post.title,
            content: post.content,
           } as Post
         })
       ),
       shareReplay(1),
     );
       }
 }
