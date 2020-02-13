import{
   trigger,
   transition,
   style,
   query,
   group,
   animateChild,
   animate,
   keyframes
 } from '@angular/animations';


 export const slider =
 trigger ( 'routeAnimations', [
   transition('portfolio => gallery',[
     style({position:"relative"}),
      query(':enter,:leave', [
        style({
          position: 'absolute',
          left:0,
         width: '100%',
        }),
      ], {optional:true}),
        group([

          query(':leave', [
            style({ transform:'translateX(0%)'}),
            animate('0.8s ease-out',
            style({ transform:'translateX(150%)'}))

          ],{optional:true}),
          query(':enter', [
            style({ transform: 'translateX(-150%)'}),
            animate('0.8s ease-out',
            style  ({ transform: 'translateX(0%)'}))
          ],{optional:true})
        ])
    ]),
    transition('gallery => portfolio',[
      style({position:'relative'}),
      query(':enter,:leave', [
        style({
       position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ], {optional:true}),
        group([
          query(':leave', [
            style({ transform: ' translateX(0%)'}),
            animate('0.8s ease-out',
            style({ transform: 'translateX(-150%)'}))

          ],{optional:true}),
          query(':enter', [
            style({ transform: ' translateX(150%)'}),
            animate('0.8s ease-out',
            style  ({ transform: 'translateX(0%)'}))

          ],{optional:true})
        ])
    ]),

    transition('portfolio => menu, gallery => menu, commissions => menu, posts => menu',[
      style({position:'relative'}),
      query(':enter,:leave', [
        style({
       position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ], {optional:true}),
        group([
          query(':leave', [
            style({ transform: 'translateX(0)'}),
            animate('0.5s ease-in',
            style({ transform: 'translateX(150%)'}))

          ],{optional:true}),
          query(':enter', [
            style({ transform: 'translateX(-100%)'}),
            animate('0.5s ease-in',
            style  ({ transform: 'translateX(0%)'}))

          ],{optional:true})
        ])
    ]),
    transition('menu => portfolio,menu => gallery, menu => commissions, menu => posts',[
      style({position:'relative'}),
      query(':enter,:leave', [
        style({
       position: 'absolute',
          left: 0,
          width: '100%',
        }),
      ], {optional:true}),
        group([
          query(':leave', [
            style({ transform: ' translateX(0%)'}),
            animate('0.5s ease-in',
            style({ transform: 'translateX(-100%)'})),

          ],{optional:true}),
          query(':enter', [
            style({ transform: ' translateX(150%)'}),
            animate('0.5s ease-in',
            style  ({ transform: 'translateX(0%)'}))

          ],{optional:true})
        ])
    ]),

 ]);
