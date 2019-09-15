CKEditor 5 text direction feature
========================================

[![npm version](https://badge.fury.io/js/%40ckeditor%2Fckeditor5-direction.svg)](https://www.npmjs.com/package/@ckeditor/ckeditor5-direction)
[![Build Status](https://travis-ci.org/ckeditor/ckeditor5-direction.svg?branch=master)](https://travis-ci.org/ckeditor/ckeditor5-direction)
[![Coverage Status](https://coveralls.io/repos/github/ckeditor/ckeditor5-direction/badge.svg?branch=master)](https://coveralls.io/github/ckeditor/ckeditor5-direction?branch=master)
<br>
[![Dependency Status](https://david-dm.org/ckeditor/ckeditor5-direction/status.svg)](https://david-dm.org/ckeditor/ckeditor5-direction)
[![devDependency Status](https://david-dm.org/ckeditor/ckeditor5-direction/dev-status.svg)](https://david-dm.org/ckeditor/ckeditor5-direction?type=dev)

This package implements text direction support for CKEditor 5.

Installation
------------
To add this feature to your editor, install the [ckeditor5-direction package](https://www.npmjs.com/package/ckeditor5-direction):

```bash
npm install --save ckeditor5-direction
```

And add it to your plugin list and toolbar configuration:

```javascript
import Direction from 'ckeditor5-direction/src/alignment';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Direction, ... ],
        toolbar: [ 'direction', ... ]
    } )
    .then( ... )
    .catch( ... );
```

Use
------------
The Direction feature enables support for text direction. You can use it to set your content direction left to right or right to left.

```javascript
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        toolbar: [
            'heading', '|', 'bulletedList', 'numberedList', 'undo', 'redo', 'direction'
        ]
    } )
    .then( ... )
    .catch( ... );
```

You can choose to use the direction dropdown ('direction') or configure the toolbar to use separate buttons for each of the options:

```javascript
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        toolbar: [
            'heading', '|', 'direction:ltr', 'direction:rtl'
        ]
    } )
    .then( ... )
    .catch( ... );
```
