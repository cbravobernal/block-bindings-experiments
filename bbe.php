<?php
/**
 * Plugin Name: Block Bindings Experiments Plugin
 * Description: Experimenting with Block Bindings.
 * Version: 1.0
 * Author: Carlos Bravo
 **/
function bbe_enqueue_editor_script() {
	wp_enqueue_script(
		'bbe-editor',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-i18n' ),
		gmdate( 's' )
	);
}
add_action( 'enqueue_block_editor_assets', 'bbe_enqueue_editor_script' );

add_action(
	'init',
	function () {
		register_block_bindings_source(
			'bbe/smile-cry',
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
