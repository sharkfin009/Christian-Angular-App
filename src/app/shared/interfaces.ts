export interface Gallery {
   slug: string;
    grid: string;
    srcImgs: any;
  }

  export interface GalleryThumb {
    slug: string;
    title:string;
    names:string;
    thumb: string;
 }

 export interface Commission {
  slug: string;
  names: string;
  grid: string;
  title: string;
 }

 export interface Post {
   slug: string;
   grid:string;
   title:string;
   content:string
 }

 export interface Video {
   slug: string;
   videoUrl: string;
   title: string;
 }
