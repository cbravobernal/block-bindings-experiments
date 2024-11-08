import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockBindingsSource( {
	name: 'carlos/smile-cry',
	useContext: [ 'postId', 'postType' ],
	getValues: ( { bindings } ) => {
		if ( bindings.content.args.key === 'smile' ) {
			return {
				content: '😊',
			};
		}
		if ( bindings.content.args.key === 'cry' ) {
			return {
				content: '😢',
			};
		}
		return {
			content: bindings.content,
		};
	},
	getFieldsList() {
		return {
			smile: {
				label: 'Show smile',
				type: 'string',
				value: '😊',
			},
			cry: {
				label: 'Show cry',
				type: 'string',
				value: '😢',
			},
		};
	},
} );
