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
  GridResolverService
} from './shared/gridResolver.service'
import {
  CommissionsComponent
} from './commissions/commissions.component'



import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component'
import { ShowreelComponent } from './showreel/showreel.component';
import { ThumbnailsResolverService } from './shared/thumbnailsResolver.service';
import { CommissionComponent } from './commission/commission.component';
import {ShowcaseWrapperComponent } from './showcase-wrapper/showcase-wrapper.component'
import { ShowcaseComponent } from './showcase/showcase.component';
import { AboutWrapperComponent } from './about-wrapper/about-wrapper.component';

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
    path: 'showcase-no-resolver',
    component: ShowcaseWrapperComponent,
    data: {
      view: "showcase-no-resolver",
      title: "Showcase",
      arrowState: false,
      xTurnState: false,
      slideXState:false,
    }
  },
  {
    path: 'showcase',
    component: ShowcaseComponent,
    resolve: {
      showCaseGrid: GridResolverService,
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
      gallery: GridResolverService,
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
      commissions: GridResolverService,
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
      commission: GridResolverService
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
    path: 'about-no-resolver',
    component: AboutWrapperComponent,
    data: {
      view: "about",
      title: "About",
      arrowState: false,
      xTurnState:true,
      slideXState:false,
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    resolve: {
      aboutGrid: GridResolverService,
    },
    data: {
      view: 'about',
      title: 'About',
      arrowState:  false,
      xTurnState: false,
      slideXState:true,

    }
  },



]
