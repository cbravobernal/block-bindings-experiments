<?php
/**
 * Plugin Name: Smile Cry Plugin
 * Description: Experimenting with Block Bindings.
 * Version: 1.0
 * Author: Carlos Bravo
 **/
function enqueue_smile_cry_script() {
	wp_enqueue_script(
		'smile-editor',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-i18n' ),
		gmdate( 's' )
	);
}
add_action( 'enqueue_block_editor_assets', 'enqueue_smile_cry_script' );

add_action(
	'init',
	function () {
		register_block_bindings_source(
			'carlos/smile-cry',
			array(
				'label'              => __( 'Emoji loader', 'custom-bindings' ),
				'get_value_callback' => function ( array $source_args, $block_instance ) {
					if ( ! isset( $source_args['key'] ) ) {
						return '';
					}
					if ( 'smile' === $source_args['key'] ) {
						return '😊';
					}
					if ( 'cry' === $source_args['key'] ) {
						return '😢';
					}
				},
				'uses_context'       => array( 'postId' ),
			)
		);
	}
);
