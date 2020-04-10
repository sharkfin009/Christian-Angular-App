import {
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
  trigger('routeAnimations', [
    transition('portfolio => gallery', [
      style({
        position: "relative"
      }),
      query(':enter,:leave', [
        style({
           position: 'absolute',
           left: 0,
          top:0,
          width: '100%',
        }),
      ]),
      group([
        query(':leave', [
          style({
            transform: 'translateX(0%)'
          }),
          animate('0.8s ease-out',
            style({
              transform: 'translateX(-100%)',
            }))
        ]),
        query(':enter', [
          style({

            transform: 'translateX(100%)',
          }),
          animate('0.8s ease-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] ),

      ])
    ]),
    transition('gallery => portfolio', [
      style({
        position: "relative"
      }),
      query(':enter,:leave', [
        style({
           position: 'absolute',
           left: 0,
          top:0,
          width: '100%',
        }),
      ]),
      group([
        query(':leave', [
          style({
            transform: 'translateX(0%)'
          }),
          animate('0.8s ease-out',
            style({
              transform: 'translateX(150%)',
            }))
        ]),
        query(':enter', [
          style({
            transform: 'translateX(-150%)',
          }),
          animate('0.8s ease-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ])
    ]),
    transition('menu => *', [
      style({
        position: "relative"
      }),
      query(':enter,:leave', [
        style({
           position: 'absolute',
           left: 0,
          top:0,
          width: '100%',
        }),
      ]),
      group([
        query(':leave', [
          style({
            transform: 'translateX(0%)'
          }),
          animate('0.8s ease-out',
            style({
              transform: 'translateX(-20%)',
            }))
        ]),
        query(':enter', [
          style({
            transform: 'translate(150%)',
          }),
          animate('0.8s ease-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),
    transition('* => menu', [
      style({
        position: "relative"
      }),
      query(':enter,:leave', [
        style({
           position: 'absolute',
           left: 0,
          top:0,
          width: '100%',
        }),
      ]),
      group([
        query(':leave', [
          style({
            transform: 'translateX(0%)'
          }),
          animate('0.8s ease-out',
            style({
              transform: 'translateX(150%)',
            }))
        ]),
        query(':enter', [
          style({
            transform: 'translate(-60%)',
          }),
          animate('0.5s ease-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),




  ]);
