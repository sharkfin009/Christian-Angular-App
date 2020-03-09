import{
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
  state
} from '@angular/animations';

export const menuAnim =
trigger( 'menuAnim',[
state('collapsed',style({
  opacity:"0",
 // transform:"translateX(-100%)"
})),
state('open',style({
  opacity:'1',
  //transform:"translateX(0%)"
})),
transition('collapsed => open', [
  animate('0.2s ease-in')
]),
transition('open => collapsed', [
  animate('0.1s ease-in')
])
]
)
