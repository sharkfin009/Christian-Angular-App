import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router'
import { GetPostsService } from './get-posts.service';

@Injectable({
  providedIn: 'root'
})

export class PostsResolverService implements Resolve<any>{
  constructor(private posts:GetPostsService) { }
    resolve() {
      return this.posts.posts$;
    }
}

