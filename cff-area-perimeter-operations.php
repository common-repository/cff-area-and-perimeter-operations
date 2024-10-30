<?php
/*
Plugin Name: CFF Area and Perimeter Operations
Plugin URI: https://cff-bundles.dwbooster.com/product/area-perimeter-operations
Description: Implements operations for calculating the figure areas and perimeters to use with the Calculated Fields Forms equations.
Version: 1.0.1
Text Domain: cff-area-perimeter
Author: CodePeople
Author URI: https://cff-bundles.dwbooster.com
License: GPL
*/

if ( ! class_exists( 'AREA_PERIMETER_CALCULATED_FIELDS_FORM' ) ) {
	class AREA_PERIMETER_CALCULATED_FIELDS_FORM {

		private static $version = '1.0.1';
		private static $obj;
		public static function init() {
			self::$obj = new AREA_PERIMETER_CALCULATED_FIELDS_FORM();
		}

		private static function delete_cache() {
			if ( self::cff_active() ) {
				$reflectionObj = new \ReflectionClass( '\CPCFF_MAIN' );
				$file_path     = $reflectionObj->getFileName();
				$cache_file    = dirname( $file_path ) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR . 'cache' . DIRECTORY_SEPARATOR . 'all.js';
				if ( file_exists( $cache_file ) ) {
					if ( ! unlink( $cache_file ) ) {
						error_log( 'The CFF cache file could not be deleted' );
					}
				}
			}
		} // End delete_cache

		private static function cff_active() {
			return class_exists( '\CPCFF_MAIN' );
		} // End cff_active

		public static function activate() {
			self::delete_cache();
		} // End activate

		public static function uninstall() {
			self::delete_cache();
		} // End uninstall

		/********************** INSTANCE METHODS AND PROPERTIES **********************/
		public function __construct() {
			if ( is_admin() ) {
				// Language
				add_action( 'after_setup_theme', array( $this, 'load_language' ) );
				add_action( 'admin_notices', array( $this, 'dashboard_message' ) );
			}

			// Load scripts
			add_action( 'cpcff_additional_admin_scripts', array( $this, 'admin_scripts' ) );
			add_action( 'cpcff_load_controls_public', array( $this, 'public_scripts' ) );
		} // End __construct

		public function admin_scripts() {
			include( dirname( __FILE__ ) . '/assets/admin.js' );
		} // End admin_scripts

		public function public_scripts() {
			include( dirname( __FILE__ ) . '/assets/public.js' );
		} // End public_scripts

		public function dashboard_message() {
			// Display dashboard message including a link to the Calculated Fields Form plugin
			if ( ! self::cff_active() && current_user_can( 'manage_options' ) ) {
				$screen = get_current_screen();
				// Check if it is the plugins or dashboard page
				if ( 'dashboard' == $screen->id || 'plugins' == $screen->id ) {
					?>
					<style>
						#cff-installation-banner{width:calc( 100% - 20px );width:-webkit-calc( 100% - 20px );width:-moz-calc( 100% - 20px );width:-o-calc( 100% - 20px );border:10px solid #1582AB;background:#FFF;display:table;}
						#cff-installation-banner .cff-installation-banner-picture{width:120px;padding:10px 10px 10px 10px;float:left;text-align:center;}
						#cff-installation-banner .cff-installation-banner-content{float: left;padding:10px;width: calc( 100% - 160px );width: -webkit-calc( 100% - 160px );width: -moz-calc( 100% - 160px );width: -o-calc( 100% - 160px );}
						#cff-installation-banner  .cff-installation-banner-buttons{padding-top:5;}
						@media screen AND (max-width:760px)
						{
							#cff-installation-banner .cff-installation-banner-picture{display:none;}
							#cff-installation-banner .cff-installation-banner-content{width:calc( 100% - 20px );width:-webkit-calc( 100% - 20px );width:-moz-calc( 100% - 20px );width:-o-calc( 100% - 20px );}
						}
					</style>
					<div id="cff-installation-banner">
						<div class="cff-installation-banner-picture">
							<img alt="" src="<?php print esc_attr( plugins_url( '/assets/icon-256x256.jpg', __FILE__ ) ); ?>" style="width:80px;">
						</div>
						<div class="cff-installation-banner-content">
							<div class="cff-installation-banner-text">
								<p><strong><?php esc_html_e( 'Plugin Name: CFF Area and Perimeter plugin implements operations for calculating the figure areas and perimeters to use with the Calculated Fields Forms equations. It requires the Calculated Fields Form to be installed and active. The Calculated Fields Form plugin is a powerful and easy-to-use forms builder. If you do not have installed it, please visit the following link (It is free). Thank you!', 'cff-area-perimeter' ); ?></p>
							</div>
							<div class="cff-installation-banner-buttons">
								<button type="button" class="button-primary" onclick="window.open('https://wordpress.org/plugins/calculated-fields-form/', '_blank');"><?php esc_html_e( 'Calculated Fields Form Plugin', 'cff-area-perimeter' ); ?>
							</div>
						</div>
						<div style="clear:both;"></div>
					</div>
					<?php
				}
			}
		} // End dashboard_message

		public function load_language() {
			// I18n
			load_plugin_textdomain( 'cff-area-perimeter', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		} // End load_language
	} // End form AREA_PERIMETER_CALCULATED_FIELDS_FORM
	AREA_PERIMETER_CALCULATED_FIELDS_FORM::init();
	register_activation_hook( __FILE__, array( 'AREA_PERIMETER_CALCULATED_FIELDS_FORM', 'activate' ) );
	register_uninstall_hook( __FILE__, array( 'AREA_PERIMETER_CALCULATED_FIELDS_FORM', 'uninstall' ) );
}
