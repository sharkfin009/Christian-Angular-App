import { Injectable, } from '@angular/core';
import { Gallery } from './gallery';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class Populate {
  getGalleries():Observable<any[]>{
    return galleries
  }

}
const galleries = [
  new Gallery(1, "Summer", 'Jun 6 2014'),
  new Gallery(2, "Winter", 'Mar 12 2016'),
  new Gallery(3, "Sadness", "Feb 14 2018")
];
