<?php
/*
Plugin Name: Penci Portfolio
Plugin URI: http://pencidesign.com/
Description: Portfolio Plugin for Soledad theme.
Version: 2.3
Author: PenciDesign
Author URI: http://themeforest.net/user/pencidesign?ref=pencidesign
*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) )
	exit;

/**
 * Define
 */
define( 'PENCI_PORTFOLIO_DIR', plugin_dir_path( __FILE__ ) );
define( 'PENCI_PORTFOLIO_URL', plugin_dir_url( __FILE__ ) );

/**
 * Main class for Vancouver Portfolio
 * Add this plugin to Vancouver theme, you'll portfolio
 * Don't support when you use this plugin to another theme
 *
 * @author PenciDesign ( http://pencidesign.com/ )
 * @since 1.0
 */
if( ! class_exists( 'Penci_Portfolio' ) ):

	class Penci_Portfolio {

		/**
		 * A reference to an instance of this class.
		 */
		private static $instance;


		/**
		 * Returns an instance of this class.
		 */
		public static function get_instance() {

			if ( null == self::$instance ) {
				self::$instance = new Penci_Portfolio();
			}

			return self::$instance;

		}

		/**
		 * Initializes the plugin by setting filters and administration functions.
		 */
		private function __construct() {

			// Include main shortcode for portfolio
			include_once( 'inc/portfolio.php' );
			
			// load plugin text domain for translations
			add_action( 'plugins_loaded', array( $this, 'load_text_domain' ) );

			// Register Portfolio Post Type
			add_action( 'init', array( $this, 'register_portfolio_post_type' ) );

			// Register Portfolio Category
			add_action( 'init', array( $this, 'register_portfolio_category' ) );

			// Override Single Portfolio Template
			add_filter( 'single_template', array( $this, 'register_portfolio_single' ) );

			// Override Categories Portfolio Template
			add_filter( 'template_include', array( $this, 'register_portfolio_categories' ) );

			// Custom Posts Per Page on Portfolio Categories
			add_action( 'pre_get_posts', array( $this, 'portfolio_custom_posts_per_page' ) );

			add_action('wp_head', array( $this,'penci_global_js' ), 10);
		}

		function penci_global_js(){
			$output = '<script>var portfolioDataJs = portfolioDataJs || [];</script>';
			echo $output;
		}
		
		/**
		 * Transition ready
		 *
		 * @access public
		 * @return void
		 * @since  1.0
		 */
		public function load_text_domain() {
			load_plugin_textdomain( 'pencidesign', false, PENCI_PORTFOLIO_DIR . '/languages/' );
		}

		/**
		 * Register Portfolio Post Type
		 */
		public function register_portfolio_post_type() {
			$labels = array(
				'name'               => _x( 'Portfolio', 'post type general name', 'pencidesign' ),
				'singular_name'      => _x( 'Portfolio', 'post type singular name', 'pencidesign' ),
				'add_new'            => __( 'Add New', 'pencidesign' ),
				'add_new_item'       => __( 'Add New Project', 'pencidesign' ),
				'edit_item'          => __( 'Edit Project', 'pencidesign' ),
				'new_item'           => __( 'New Project', 'pencidesign' ),
				'all_items'          => __( 'All Projects', 'pencidesign' ),
				'view_item'          => __( 'View Portfolio', 'pencidesign' ),
				'search_items'       => __( 'Search Portfolio', 'pencidesign' ),
				'not_found'          => __( 'No projects found', 'pencidesign' ),
				'not_found_in_trash' => __( 'No projects found in Trash', 'pencidesign' ),
				'parent_item_colon'  => '',
				'menu_name'          => _x( 'Portfolio', 'post type general name', 'pencidesign' ),
			);

			$args = array(
				'labels'             => $labels,
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'query_var'          => self::get_slug(),
				'rewrite'            => array( 'slug' => self::get_slug() ),
				'capability_type'    => 'post',
				'has_archive'        => true,
				'hierarchical'       => false,
				'menu_position'      => null,
				'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
			);

			register_post_type( 'portfolio', $args );
		}

		/**
		 * Register Portfolio Categories
		 */
		public function register_portfolio_category() {
			$labels = array(
				'name'              => _x( 'Portfolio Categories', 'taxonomy general name', 'pencidesign' ),
				'singular_name'     => _x( 'Portfolio Category', 'taxonomy singular name', 'pencidesign' ),
				'search_items'      => __( 'Search Portfolio Categories', 'pencidesign' ),
				'all_items'         => __( 'All Portfolio Categories', 'pencidesign' ),
				'parent_item'       => __( 'Parent Portfolio Category', 'pencidesign' ),
				'parent_item_colon' => __( 'Parent Portfolio Category:', 'pencidesign' ),
				'edit_item'         => __( 'Edit Portfolio Category', 'pencidesign' ),
				'update_item'       => __( 'Update Portfolio Category', 'pencidesign' ),
				'add_new_item'      => __( 'Add New Portfolio Category', 'pencidesign' ),
				'new_item_name'     => __( 'New Portfolio Category Name', 'pencidesign' ),
				'menu_name'         => __( 'Portfolio Category', 'pencidesign' )
			);

			$args = array(
				'hierarchical'      => true,
				'labels'            => $labels,
				'show_ui'           => true,
				'show_admin_column' => true,
				'query_var'         => true,
				'rewrite'           => array( 'slug' => self::get_slug_tax() )
			);

			register_taxonomy( 'portfolio-category', array( 'portfolio' ), $args );
		}

		/**
		 * Register single portfolio template
		 */
		public function register_portfolio_single( $single_template ) {
			global $post;
			if ( $post->post_type == 'portfolio' ) {
				$single_template = dirname(__FILE__) . '/inc/single-portfolio.php';
			}
			return $single_template;
		}

		/**
		 *	Register categories portfolio template
		 */
		public function register_portfolio_categories( $template ) {
			if ( is_tax( 'portfolio-category' ) ) {
				$template = dirname( __FILE__ ) . '/inc/taxonomy-portfolio-category.php';
			}
			return $template;
		}

		/**
		 * Custom posts per page portfolio categories listing
		 */
		public function portfolio_custom_posts_per_page( $query ) {
			if ( is_tax( 'portfolio-category' ) && $query->is_main_query() ) {
				$numpost = get_theme_mod( 'penci_portfolio_cat_showposts' );
				if( ! isset ( $numpost ) || empty( $numpost ) ): $numpost = '12'; endif;
				$query->set( 'posts_per_page', $numpost );
			}
		}

		public static function get_image_ratio( $image, $echo = true ) {
			$ratio = 'padding-bottom: 66.6666667%;';

			if ( false === strpos( $image, '<img' ) ) {
				return $image;
			}
			$src_img   = '';
			$pre_image = $image;
			if ( preg_match( '@src="([^"]+)"@', $pre_image, $match ) ) {
				$src_img = array_pop( $match );
			}

			if ( preg_match_all( '#(width|height)=(\'|")?(?<dimensions>[0-9]+)(\'|")?#i', $image, $image_dis ) && 2 == count( (array)$image_dis['dimensions'] ) ) {
				$ratio = 'padding-bottom:' . self::get_pre_ratio( $image_dis['dimensions'][0], $image_dis['dimensions'][1] ) . '%';
			}

			if ( preg_match( '(class=(\'|")[^"]+)', $image, $class_el ) ) {
				$image = str_replace( $class_el[0], $class_el[0] . ' penci-pfl-lazy" data-src="' . $src_img, $image );
			}

			$output = '<span class="penci-image-placeholder" style="' . $ratio . '">' . $image . '</span>';

			if ( ! $echo ) {
				return $output;
			}

			echo $output;
		}

		public static function get_pre_ratio( $width, $height ) {
			return number_format( $height / $width * 100, 8 );
		}

		public static function get_slug(){
			return get_theme_mod( 'penci_pfl_custom_slug' ) ? get_theme_mod( 'penci_pfl_custom_slug' ) : 'portfolio';
		}

		public static function get_slug_tax(){
			return get_theme_mod( 'penci_pfl_custom_catslug' ) ? get_theme_mod( 'penci_pfl_custom_catslug' ) : 'portfolio-category';
		}

	}

	add_action( 'plugins_loaded', array( 'Penci_Portfolio', 'get_instance' ) );

endif; /* End check if class exists */


