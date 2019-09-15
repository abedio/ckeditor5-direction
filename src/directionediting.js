/**
 * @license Copyright (c) 2019-2020, CKSource - Mahdi Abedi. All rights reserved.
 */

/**
 * @module direction/directionediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import DirectionCommand from './directioncommand';
import { isDefault, isSupported, supportedOptions } from './utils';

/**
 * The direction editing feature. It introduces the {@link module:direction/directioncommand~DirectionCommand command} and adds
 * the `direction` attribute for block elements in the {@link module:engine/model/model~Model model}.
 * @extends module:core/plugin~Plugin
 */
export default class DirectionEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'direction', {
			options: [ ...supportedOptions ]
		} );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		// Filter out unsupported options.
		const enabledOptions = editor.config.get( 'direction.options' ).filter( isSupported );

		// Allow direction attribute on all blocks.
		schema.extend( '$block', { allowAttributes: 'direction' } );
		editor.model.schema.setAttributeProperties( 'direction', { isFormatting: true } );

		const definition = _buildDefinition( enabledOptions.filter( option => !isDefault( option ) ) );

		editor.conversion.attributeToAttribute( definition );

		editor.commands.add( 'direction', new DirectionCommand( editor ) );
	}
}

// Utility function responsible for building converter definition.
// @private
function _buildDefinition( options ) {
	const definition = {
		model: {
			key: 'direction',
			values: options.slice()
		},
		view: {}
	};

	for ( const option of options ) {
		definition.view[ option ] = {
			key: 'style',
			value: {
				'direction': option
			}
		};
	}

	return definition;
}
