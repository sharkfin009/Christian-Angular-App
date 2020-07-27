<?php
/**
 * Plugin Name: APIplugin
 * Description: Plugin to set up custom API for Christian Doppelgatz Photography Portfolio
 *
 * Author: Ben Amato
 */
define('WP_DEBUG', true);


function ms_setup() {
add_image_size( 'portfolio-thumb', 675, 450, true );
};

add_action( 'after_setup_theme', 'ms_setup' );

function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
};

add_action('init','add_cors_http_header');


function my_lg_enqueue_scripts(){
  wp_enqueue_style( 'laygrid' );
     wp_enqueue_script('lg-flexbox-polyfill');
     if (get_option('misc_options_simple_parallax', '') == 'on') {
         wp_enqueue_script('lg-parallax');
     }
  }



if( empty($galleries)) return null;

  //sort by order

function sort_method($a,$b){
  return ($a["order_field"] <=$b["order_field"]) ? -1 : 1;
}
  usort($sort, "sort_method");

  return $sort;

  };





 //endpoints

add_action( 'rest_api_init', function () {
    register_rest_route( 'gallery_thumbnail/v1', '/(?P<index>[a-zA-Z0-9-]+)', array(
      'methods' => 'GET',
      'callback' => 'getThumbnails',
    ) );

    register_rest_route( 'galleries_endpoint/v1', '/getGallery/(?P<slug>[a-zA-Z0-9-]+)', array(
      'methods' => 'GET',
      'callback' => 'getGallery',
    ) );

	    register_rest_route( 'commissions_endpoint/v1', '/getThumbs/', array(
      'methods' => 'GET',
      'callback' => 'getCommissionsThumbs',
    ) );

    register_rest_route( 'getcommission/v1', '(?P<slug>[a-zA-Z0-9-]+)', array(
      'methods' => 'GET',
      'callback' => 'getCommission',
    ) );

	    register_rest_route( 'getPosts/v1', '/please', array(
      'methods' => 'GET',
      'callback' => 'getPosts',
    ) );

		    register_rest_route( 'getVideos/v1', '/please', array(
      'methods' => 'GET',
      'callback' => 'getVideos',
    ) );

  } );

  function getThumbnails($index){
    	//create array of galleries in order

  $args = [
    "numberposts" => 9999,
    "post_type" => "gallery",
    "category" => '0',

  ];
  $galleries = get_posts( $args );
  $sort = [];
  $i = 0;

  foreach($galleries as $gallery){
    if ($gallery->post_name != "showcase"){
      $sort[$i]['title'] = $gallery->post_title;
      $sort[$i]['url'] = get_the_post_thumbnail _url($gallery->$ID,"portfolio-thumb");
      $sort[$i]['order_field'] = get_post_meta($gallery->ID,"order_field",true);
      $sort[$i]['names' ] = get_post_meta($gallery->ID,'names',true);
      $i++;
  }
}

if( empty($galleries)) return null;

  //sort by order

function sort_method($a,$b){
  return ($a["order_field"] <= $b["order_field"]) ? -1 : 1;
}
  usort($sort, "sort_method");

			return $sort[$index["index"]];
		};


function getGallery( $slug ){
      $args =[
          "post_type" => "gallery",
          "category" => '0',
		  "name" => $slug['slug'],
      ];
      $post = get_posts( $args );

       $data =  get_laygrid($post[0]->ID,'post');

      if ( empty( $post ) ) {
        return null;
      }
      return $data;

};

function getCommissionsThumbs(){
      $args =[

          "post_type" => "thumbnails_layout",
		 	"name" => "commissions"
      ];
      $post = get_posts( $args );

      if ( empty( $post ) ) {
        return "null";
      }
		$data = get_laygrid($post[0]->ID,'post');
      return $data;
};

function getCommission($slug){
      $args =[

          "post_type" => "commissions",
		 	"name" => $slug['slug'],
      ];
      $post = get_posts( $args );

    $data =  get_laygrid($post[0]->ID,'post');


      if ( empty( $post ) ) {
        return null;
      }
      return $data;

};

function getPosts(){

      $args =[
          "numberposts" => 9999,
          "post_type" => "post",
      ];
      $posts = get_posts( $args );
      $i = 0;
      $data = [];
      foreach($posts as $post){
          $data[$i]['slug'] = $post->post_name;
		     $data[$i]['title'] = $post->post_title;
		    $data[$i]['content'] = $post->post_content;
		   $data[$i]['grid'] = get_laygrid($post->ID,'post');
// 		   $data[$i]['order_field'] = get_post_meta($post->ID,'order_field',true);
             $i++;
        }
      if ( empty( $posts ) ) {
        return null;
      }
      return $data;

};

function getVideos(){

global $wpdb;


      $args =[
          "numberposts" => 9999,
          "post_type" => "videos",
			"category" => '0',

      ];
      $posts = get_posts( $args );
      $i = 0;
      $data = [];
      foreach($posts as $post){
          $data[$i]['slug'] = $post->post_name;
		  $data[$i]['title'] = $post->post_title;
		  $id = $post->ID;
			$queryString = "SELECT guid FROM $wpdb WHERE post_parent =" .$id;
		  $result= $wpdb->get_results($queryString);
		  $data[$i]['videoUrl'] = $result;
		   $data[$i]['order_field'] = get_post_meta($post->ID,'order_field',true);
             $i++;
        }
      if ( empty( $posts ) ) {
        return null;
      }
      return $data;

}

