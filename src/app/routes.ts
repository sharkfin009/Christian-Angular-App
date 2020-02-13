import {
  Routes
} from '@angular/router'
import {
  GalleryComponent
} from './gallery/gallery.component'
import {
  PortfolioComponent
} from './portfolio/portfolio.component';

import {
  GalleriesResolverService
} from './shared/galleriesResolver.service'
import {
  CommissionsComponent
} from './commissions/commissions.component'
import { MenuComponent } from './menu/menu.component';
import {
  CommissionsResolverService
} from './shared/commissionsResolver.service'
import { PostsComponent } from './posts/posts.component';
import { PostsResolverService } from './shared/postsResolver.service';

export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
    data: {
      view: 'portfolio'
    }
  },
  {
    path: 'gallery/:slug',
    component: GalleryComponent,
    resolve: {
      grids: GalleriesResolverService,
    },
    data: {
      view: 'gallery'
    }
  }, {
    path: '',
    redirectTo: '/gallery/showcase',
    pathMatch: 'full'
  }, {
    path: 'commissions',
    component: CommissionsComponent,
    resolve: {
      commissions: CommissionsResolverService,
    },
    data: {
      view: 'commissions'
    }
  },
  {
    path: 'posts',
    component: PostsComponent,
    resolve: {
      posts: PostsResolverService,
    },
    data: {
      view: 'posts'
    }
  },{
    path: 'menu',
    component: MenuComponent,
    data: {
      view: "menu"
    }
  },
  {
    path: 'gallery/showcase',
    component: GalleryComponent,
    data: {
      view: "gallery",
    }
  },



]
