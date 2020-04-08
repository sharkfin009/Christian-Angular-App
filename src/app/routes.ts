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
import { MenuComponent } from './menu/menu.component';
import { ShowreelComponent } from './showreel/showreel.component';

export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
    data: {
      view: 'portfolio',
      title: "Portfolio",
      arrowState: false,
      xState:false,
    }
  },
  {
    path: 'home',
    component: PortfolioComponent,
    data: {
      view: 'home',
      title: "",
      arrowState: false,
      xState:false,
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
      arrowState:  true,
      xState: false,

    }
  },
   {
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
      arrowState: false,
      xState:false,
    }
  },
  {
    path: 'gallery/showcase',
    component: GalleryComponent,
    data: {
      view: "gallery",
      title: "Gallery",
      arrowState: false,
      xState: false,
    }
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      view: "menu",
      title: "menu",
      arrowState: false,
      xState:true,
    }
  },
  {
    path: 'showreel',
    component: ShowreelComponent,
    data: {
      view: "showreel",
      title: "Showreel",
      arrowState: false,
      xState:true,
    }
  },




]
