/**
 * @license Copyright (c) 2019, CKSource - Mahdi Abedi. All rights reserved.
 * Icons made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0
 */

/**
 * @module direction/direction
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import DirectionEditing from './directionediting';
import DirectionUI from './directionui';

/**
 * The text direction plugin.
 *
 * For a detailed overview, check the {@glink features/text-direction Text direction feature documentation}
 * and the {@glink api/direction package page}.
 *
 * This is a "glue" plugin which loads the {@link module:direction/directionediting~DirectionEditing} and
 * {@link module:direction/directionui~DirectionUI} plugins.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Direction extends Plugin {
	constructor(editor) {
		super(editor);
	}
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ DirectionEditing, DirectionUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Direction';
	}
}
