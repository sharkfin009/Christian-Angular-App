import {
  Routes
} from '@angular/router'
import { GridGalleryComponent } from './grid-gallery/grid-gallery.component'
import {
  PortfolioComponent
} from './portfolio/portfolio.component';
import {
  GalleriesResolverService
} from './shared/galleries_resolver.service'
import {
  GridsResolverService
} from './shared/grids_resolver.service'



export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
    resolve: {
      galleries: GalleriesResolverService
    },
    data:{view:'portfolio'}
  },
  {
    path: 'gallery/:title',
    component: GridGalleryComponent,
    resolve: {
      grids: GridsResolverService
    },
     data:{view:'gallery'}
  },
   { path: '',
    redirectTo: '/portfolio',
    pathMatch: 'full'
  }
]
