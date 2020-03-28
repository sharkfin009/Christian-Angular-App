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
    transition('* <=> *', [
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
        ],{optional:true}),
        query(':enter', [
          style({
            transform: 'translateX(-150%)'
          }),
          animate('0.8s ease-out',
            style({
              transform: 'translateX(0%)'
            }))
        ],{optional:true} )
      ])
    ]),




  ]);
