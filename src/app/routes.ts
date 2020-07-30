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

import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component'
import { ShowreelComponent } from './showreel/showreel.component';
import { ThumbnailsResolverService } from './shared/thumbnailsResolver.service';
import { CommissionComponent } from './commission/commission.component';
import {GalleryWrapperComponent } from './gallery-wrapper/gallery-wrapper.component'
import { ShowcaseComponent } from './showcase/showcase.component';
import { AboutWrapperComponent } from './about-wrapper/about-wrapper.component';
import { AboutResolverService } from './shared/aboutResolver.service'

export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
    // resolve: {
    //   thumbnails: ThumbnailsResolverService,
    // },
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
    component: GalleryWrapperComponent,
    data: {
      view: "showcase-wrapper",
      title: "showcase-wrapper",
      arrowState: false,
      xTurnState: false,
      slideXState:false,
    }
  },
  {
    path: 'showcaseInner',
    component: ShowcaseComponent,
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
  {
    path: 'about',
    component: AboutWrapperComponent,
    data: {
      view: "aboutWrapper",
      title: "AboutWrapper",
      arrowState: false,
      xTurnState:true,
      slideXState:false,
    }
  },
  {
    path: 'aboutInner',
    component: AboutComponent,
    resolve: {
      aboutGrid: AboutResolverService,
    },
    data: {
      view: 'about',
      title: 'about',
      arrowState:  false,
      xTurnState: false,
      slideXState:true,

    }
  },



]
