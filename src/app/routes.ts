import {
  Routes
} from '@angular/router'
import { GalleryComponent } from './gallery/gallery.component'
import {
  PortfolioComponent
} from './portfolio/portfolio.component';
import {
 ThumbnailsResolverService
} from './shared/thumbnailsResolver.service'
import {
  GalleriesResolverService
} from './shared/galleriesResolver.service'
import {
  CommissionsComponent
} from './commissions/commissions.component'
import { LightboxesResolverService } from './shared/lightboxesResolver.service';



export const appRoutes: Routes = [{
    path: 'portfolio',
    component: PortfolioComponent,
    resolve: {
      galleries: ThumbnailsResolverService
    },
    data:{view:'portfolio'}
  },
  {
    path: 'gallery/:slug',
    component: GalleryComponent,
    resolve: {
      grids: GalleriesResolverService,
      lightboxes: LightboxesResolverService,
    },
     data:{view:'gallery'}
  },
   { path: '',
    redirectTo: '/portfolio',
    pathMatch: 'full'
  },
  {
    path: 'commissions',
    component: CommissionsComponent,
    data:{view:'Commissions'}
  },

]
