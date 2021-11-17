/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module direction/utils
 */

/**
 * The list of supported direction options:
 *
 * * `'ltr'`,
 * * `'rtl'`,
 */
export const supportedOptions = [ 'ltr', 'rtl' ];

/**
 * Checks whether the passed option is supported by {@link module:direction/directionediting~DirectionEditing}.
 *
 * @param {String} option The option value to check.
 * @returns {Boolean}
 */
export function isSupported( option ) {
	return supportedOptions.includes( option );
}

/**
 * Checks whether direction is the default one.
 *
 * @param {String} direction The name of the direction to check.
 * @returns {Boolean}
 */
export function isDefault( direction ) {
	// Right now only LTR is supported so the 'ltr' value is always the default one.
	return direction === 'ltr';
}
