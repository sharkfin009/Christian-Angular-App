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
import {
  CommissionResolverService
} from './shared/commissionResolver.service'
import { PostsComponent } from './posts/posts.component';
import { PostsResolverService } from './shared/postsResolver.service';
import { MenuComponent } from './menu/menu.component';
import { ShowreelComponent } from './showreel/showreel.component';
import { ThumbnailsResolverService } from './shared/thumbnailsResolver.service';
import { CommissionComponent } from './commission/commission.component';

export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
    resolve: {
      thumbnails: ThumbnailsResolverService,
    },
    data: {
      view: 'portfolio',
      title: "Portfolio",
      arrowState: false,
      xTurnState:false,
      slideXState:false
    }
  },

  {
    path: 'showcase',
    component: GalleryComponent,
    resolve: {
      gallery: GalleriesResolverService,
    },
    data: {
      view: "showcase",
      title: "Showcase",
      arrowState: false,
      xTurnState: false,
      slideXState:true,

    }
  },
   {
    path: 'gallery/:slug',
    component: GalleryComponent,
    resolve: {
      gallery: GalleriesResolverService,
    },
    data: {
      view: 'gallery',
      title: 'Gallery',
      arrowState:  true,
      xTurnState: false,
      slideXState:true,

    }
  },
   {
    path: '',
    redirectTo: '/showcase',
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
      xTurnState:false,
      slideXState:false,

    }
  },
  {
    path: 'commission/:slug',
    component: CommissionComponent,
    resolve: {
      commission: CommissionResolverService
    },
    data: {
      view: 'commission',
      title: 'Commission',
      arrowState: true,
      xTurnState:false,
      slideXState:true,

    }
  },

  {
    path: 'menu',
    component: MenuComponent,

    data: {
      view: "menu",
      title: "menu",
      arrowState: false,
      xTurnState:true,
      slideXState:false,
    }
  },
  {
    path: 'showreel',
    component: ShowreelComponent,
    data: {
      view: "showreel",
      title: "Showreel",
      arrowState: false,
      xTurnState:true,
      slideXState:false,
    }
  },




]
