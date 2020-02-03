export interface Gallery {
   slug: string;
    grid: string;
    images: any[];
    title: string;
  }

  export interface GalleryThumb {
    slug: string;
    title:string;
    content:string;
    thumb: string;




 }

 export interface Commission {
  slug: string;
  content: string;
  grid: string;
  title: string;

 }

 export interface Post {
   slug: string;
   grid:string;
   title:string;

 }

 export interface Video {
   slug: string;
   videoUrl: string;
   title: string;

 }
