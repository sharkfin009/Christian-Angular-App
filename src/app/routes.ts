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

import {
  CommissionsResolverService
} from './shared/commissionsResolver.service'
import { PostsComponent } from './posts/posts.component';
import { PostsResolverService } from './shared/postsResolver.service';

export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
    data: {
      view: 'portfolio',
      title: "Portfolio",
    }
  },
  {
    path: 'gallery/:slug',
    component: GalleryComponent,
    resolve: {
      grids: GalleriesResolverService,
    },
    data: {
      view: 'gallery',
      title: 'Gallery',
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
      view: 'commissions',
      title: 'Commissions',
    }
  },
  {
    path: 'gallery/showcase',
    component: GalleryComponent,
    data: {
      view: "gallery",
      title: "Gallery",
    }
  },



]
