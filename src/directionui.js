/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module direction/directionui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import { isSupported } from './utils';

import alignLeftIcon from '../theme/icons/ltr.svg';
import alignRightIcon from '../theme/icons/rtl.svg';

const icons = new Map( [
	[ 'ltr', alignLeftIcon ],
	[ 'rtl', alignRightIcon ],
] );

/**
 * The default direction UI plugin.
 *
 * It introduces the `'direction:ltr'` and `'direction:rtl'` buttons
 * and the `'direction'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class DirectionUI extends Plugin {
	/**
	 * Returns the localized option titles provided by the plugin.
	 *
	 * The following localized titles corresponding with
	 * {@link module:direction/direction~DirectionConfig#options} are available:
	 *
	 * * `'ltr'`,
	 * * `'rtl'`,
	 *
	 * @readonly
	 * @type {Object.<String,String>}
	 */
	get localizedOptionTitles() {
		const t = this.editor.t;

		return {
			'ltr': t( 'Direction left to right' ),
			'rtl': t( 'Direction right to left' ),
		};
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'DirectionUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const componentFactory = editor.ui.componentFactory;
		const t = editor.t;
		const options = editor.config.get( 'direction.options' );

		options
			.filter( isSupported )
			.forEach( option => this._addButton( option ) );

		componentFactory.add( 'direction', locale => {
			const dropdownView = createDropdown( locale );

			// Add existing direction buttons to dropdown's toolbar.
			const buttons = options.map( option => componentFactory.create( `direction:${ option }` ) );
			addToolbarToDropdown( dropdownView, buttons );

			// Configure dropdown properties an behavior.
			dropdownView.buttonView.set( {
				label: t( 'Text direction' ),
				tooltip: true
			} );

			dropdownView.toolbarView.isVertical = true;

			dropdownView.extendTemplate( {
				attributes: {
					class: 'ck-direction-dropdown'
				}
			} );

			// The default icon is align left as we do not support RTL yet (see #3).
			const defaultIcon = alignLeftIcon;

			// Change icon to reflect current selection's direction.
			dropdownView.buttonView.bind( 'icon' ).toMany( buttons, 'isOn', ( ...areActive ) => {
				// Get the index of an active button.
				const index = areActive.findIndex( value => value );

				// If none of the commands is active, display either defaultIcon or the first button's icon.
				if ( index < 0 ) {
					return defaultIcon;
				}

				// Return active button's icon.
				return buttons[ index ].icon;
			} );

			// Enable button if any of the buttons is enabled.
			dropdownView.bind( 'isEnabled' ).toMany( buttons, 'isEnabled', ( ...areEnabled ) => areEnabled.some( isEnabled => isEnabled ) );

			return dropdownView;
		} );
	}

	/**
	 * Helper method for initializing the button and linking it with an appropriate command.
	 *
	 * @private
	 * @param {String} option The name of the direction option for which the button is added.
	 */
	_addButton( option ) {
		const editor = this.editor;

		editor.ui.componentFactory.add( `direction:${ option }`, locale => {
			const command = editor.commands.get( 'direction' );
			const buttonView = new ButtonView( locale );

			buttonView.set( {
				label: this.localizedOptionTitles[ option ],
				icon: icons.get( option ),
				tooltip: true
			} );

			// Bind button model to command.
			buttonView.bind( 'isEnabled' ).to( command );
			buttonView.bind( 'isOn' ).to( command, 'value', value => value === option );

			// Execute command.
			this.listenTo( buttonView, 'execute', () => {
				editor.execute( 'direction', { value: option } );
				editor.editing.view.focus();
			} );

			return buttonView;
		} );
	}
}
