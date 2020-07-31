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
} from './shared/old/galleriesResolver.service'
import {
  CommissionsComponent
} from './commissions/commissions.component'

import {
  CommissionsResolverService
} from './shared/commissionsResolver.service'
import {
  CommissionResolverService
} from './shared/old/commissionResolver.service'

import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component'
import { ShowreelComponent } from './showreel/showreel.component';
import { ThumbnailsResolverService } from './shared/thumbnailsResolver.service';
import { CommissionComponent } from './commission/commission.component';
import {ShowcaseWrapperComponent } from './showcase-wrapper/showcase-wrapper.component'
import { ShowcaseComponent } from './showcase/showcase.component';
import { AboutWrapperComponent } from './about-wrapper/about-wrapper.component';
import { AboutResolverService } from './shared/old/aboutResolver.service'

export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
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
    component: ShowcaseWrapperComponent,
    data: {
      view: "showcase-wrapper",
      title: "showcase",
      arrowState: false,
      xTurnState: false,
      slideXState:false,
    }
  },
  {
    path: 'show-case',
    component: ShowcaseComponent,
    resolve: {
      gallery: GalleriesResolverService,
    },
    data: {
      view: "show-case",
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
      title: "About",
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
      view: 'about-inner',
      title: 'about',
      arrowState:  false,
      xTurnState: false,
      slideXState:true,

    }
  },



]
