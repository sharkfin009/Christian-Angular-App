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
        position: "relative",
        width:'100%'
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
            opacity:1,
             transform: 'translateY(0%)'
          }),
          animate('0.8s ease-out',
            style({
              opacity:0,
              transform: 'translateY(-100%)',
            }))
        ],{optional:true}),

        query(':enter', [
          style({

           transform: 'translateY(200%)',
          opacity:0

          }),
          animate('1s ease-out',
            style({

              transform: 'translateY(0%)',
              opacity:1
            }))
        ],{optional:true} ),

      ])
    ]),
    transition('gallery => portfolio', [
      style({
        position: "relative",
        width:"100%"
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
            opacity:1,
           //  transform: 'translateY(0%)'
          }),
          animate('0.8s ease-out',
            style({
              opacity: 0,
            //  transform: 'translateY(200%)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(-200%)',

          }),
          animate('1s ease-in',
            style({
              opacity:1,
              transform: 'translateY(0%)',

            }))
        ],{optional:true} ),

      ])
    ]),

    transition('commissions => commission', [
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
            transform: 'translateY(0%)'
          }),
          animate('0.8s ease-out',
            style({
              transform: 'translateY(-100%)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({

            transform: 'translateY(100%)',

          }),
          animate('0.8s ease-out',
            style({

              transform: 'translateY(0%)',

            }))
        ],{optional:true} ),

      ])
    ]),
    transition('commission => commissions', [
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
            transform: 'translateY(0%)'
          }),
          animate('0.8s ease-out',
            style({
              transform: 'translateY(200vh)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({
            transform: 'translateY(-200vh)',
          }),
          animate('0.8s ease-out',
            style({

              transform: 'translateY(0%)'
            }))
        ] ,{optional:true})
      ])
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
        ],{optional:true}),
        query(':enter', [
          style({
            transform: 'translate(-60%)',
          }),
          animate('0.5s ease-out',
            style({

              transform: 'translateX(0%)'
            }))
        ],{optional:true} )
      ]),
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
          animate('0.5s ease-in',
            style({
              transform: 'translateX(-20%)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({
             transform: 'translateX(100%)',
          }),
          animate('0.5s ease-out',
            style({

               transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),
    transition('showcase => showcaseInner', [
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
          animate('0.5s ease-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),

    transition('portfolio => showcase', [
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
          animate('0.8s ease-in-out',
            style({
              transform: 'translateX(-150%)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({
            transform: 'translateX(150%)',
          }),
          animate('0.8s ease-in-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),
    transition('gallery => showcase', [
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
          animate('0.8s ease-in-out',
            style({
              transform: 'translateX(-150%)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({
            transform: 'translateX(150%)',
          }),
          animate('0.8s ease-in-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),
    transition('about => showcase', [
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
          animate('0.8s ease-in-out',
            style({
              transform: 'translateX(-150%)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({
            transform: 'translateX(150%)',
          }),
          animate('0.8s ease-in-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),
 
    transition('commissions => showcase', [
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
          animate('0.8s ease-in-out',
            style({
              transform: 'translateX(-150%)',
            }))
        ],{optional:true}),
        query(':enter', [
          style({
            transform: 'translateX(150%)',
          }),
          animate('0.8s ease-in-out',
            style({

              transform: 'translateX(0%)'
            }))
        ] )
      ]),
    ]),




  ]);
