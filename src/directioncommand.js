/**
 * @license Copyright (c) 2019-2020, CKSource - Mahdi Abedi. All rights reserved.
 */

/**
 * @module direction/directioncommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

import { isDefault } from './utils';

const DIRECTION = 'direction';

/**
 * The direction command plugin.
 *
 * @extends module:core/command~Command
 */
export default class DirectionCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const firstBlock = first( this.editor.model.document.selection.getSelectedBlocks() );

		// As first check whether to enable or disable the command as the value will always be false if the command cannot be enabled.
		this.isEnabled = !!firstBlock && this._canBeAligned( firstBlock );

		/**
		 * A value of the current block's direction.
		 *
		 * @observable
		 * @readonly
		 * @member {String} #value
		 */
		this.value = ( this.isEnabled && firstBlock.hasAttribute( 'direction' ) ) ? firstBlock.getAttribute( 'direction' ) : 'ltr';
	}

	/**
	 * Executes the command. Applies the direction `value` to the selected blocks.
	 * If no `value` is passed, the `value` is the default one or it is equal to the currently selected block's direction attribute,
	 * the command will remove the attribute from the selected blocks.
	 *
	 * @param {Object} [options] Options for the executed command.
	 * @param {String} [options.value] The value to apply.
	 * @fires execute
	 */
	execute( options = {} ) {
		const editor = this.editor;
		const model = editor.model;
		const doc = model.document;

		const value = options.value;

		model.change( writer => {
			// Get only those blocks from selected that can have direction set
			const blocks = Array.from( doc.selection.getSelectedBlocks() ).filter( block => this._canBeAligned( block ) );
			const currentDirection = blocks[ 0 ].getAttribute( 'direction' );

			// Remove direction attribute if current direction is:
			// - default (should not be stored in model as it will bloat model data)
			// - equal to currently set
			// - or no value is passed - denotes default direction.
			const removeDirection = isDefault( value ) || currentDirection === value || !value;

			if ( removeDirection ) {
				removeDirectionFromSelection( blocks, writer );
			} else {
				setDirectionOnSelection( blocks, writer, value );
			}
		} );
	}

	/**
	 * Checks whether a block can have direction set.
	 *
	 * @private
	 * @param {module:engine/model/element~Element} block The block to be checked.
	 * @returns {Boolean}
	 */
	_canBeAligned( block ) {
		return this.editor.model.schema.checkAttribute( block, DIRECTION );
	}
}

// Removes the direction attribute from blocks.
// @private
function removeDirectionFromSelection( blocks, writer ) {
	for ( const block of blocks ) {
		writer.removeAttribute( DIRECTION, block );
	}
}

// Sets the direction attribute on blocks.
// @private
function setDirectionOnSelection( blocks, writer, direction ) {
	for ( const block of blocks ) {
		writer.setAttribute( DIRECTION, direction, block );
	}
}
