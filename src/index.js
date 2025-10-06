import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockBindingsUtils } from '@wordpress/block-editor';

registerBlockBindingsSource( {
	name: 'bbe/smile-cry',
	useContext: [ 'postId', 'postType' ],
	getValues: ( { bindings } ) => {
		if ( bindings.content?.args?.key === 'smile' ) {
			return {
				content: '😊',
			};
		}
		if ( bindings.content?.args?.key === 'cry' ) {
			return {
				content: '😢',
			};
		}
		return {
			content: bindings.content,
		};
	},
	editorUI( { select, context } ) {
		return {
			mode: 'dropdown',
			data: [
				{
					key: 'smile',
					label: __( 'Smile', 'text-domain' ),
					type: 'string',
					args: {
						key: 'smile',
					},
				},
				{
					key: 'cry',
					value: '😢',
					label: __( 'Cry', 'text-domain' ),
					type: 'string',
					args: {
						key: 'cry',
					},
				},
			],
		};
	},
} );

registerBlockBindingsSource( {
	name: 'bbe/read-only-info',
	useContext: [ 'postId', 'postType' ],
	canUserEditValue: false, // This makes the source read-only
	getValues: ( { bindings } ) => {
		return {
			content: 'This is read-only content that cannot be edited',
		};
	},
	getFieldsList() {
		return {
			info: {
				label: 'Read-only information',
				type: 'string',
				value: 'This is read-only content that cannot be edited',
			},
		};
	},
	editorUI( { select, context } ) {
		return {
			mode: 'dropdown',
			data: [
				{
					key: 'info',
					label: __( 'Read-only Info', 'text-domain' ),
					type: 'string',
					args: {
						key: 'info',
					},
				},
			],
		};
	},
} );

// Instead of calling new Date() on every render
const getCurrentDate = () => new Date().toISOString().split( 'T' )[ 0 ];

const ModalNowDateButton = ( { attribute, onCloseModal } ) => {
	const { updateBlockBindings } = useBlockBindingsUtils();

	return (
		<button
			style={ {
				padding: '8px 16px',
				backgroundColor: '#007cba',
				color: 'white',
				border: 'none',
				borderRadius: '4px',
				cursor: 'pointer',
			} }
			onClick={ () => {
				updateBlockBindings( {
					[ attribute ]: {
						source: 'bbe/now-date',
					},
				} );
				onCloseModal();
			} }
		>
			Set now Date
		</button>
	);
};

registerBlockBindingsSource( {
	name: 'bbe/now-date',
	useContext: [ 'postId', 'postType' ],
	getValues: ( { bindings } ) => {
		return {
			content: getCurrentDate(),
		};
	},
	editorUI() {
		const currentDate = getCurrentDate();
		return {
			mode: 'modal',
			data: [
				{
					value: currentDate,
					label: __( 'Current date', 'text-domain' ),
					type: 'string',
				},
			],
			renderModalContent: ModalNowDateButton,
		};
	},
} );
