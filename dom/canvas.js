/*global aap, jQuery*/

aap.canvas = (function ($) {
	'use strict';
	
	function createCanvas(id, dimesions, $parent_container) {
		var canvas,
			$element = $('<canvas id="' + id + '" width="' + dimesions.width + '" height="' + dimesions.height + '" />').appendTo($parent_container);

		canvas = {
			getElement: function () {
				return $element;
			},

			getContext: function (type) {
				return $element.get(0).getContext(type);
			}
		};
		
		return canvas;
	}
	
	return {
		create: function (id, dimesions, $parent_container) {
			return createCanvas(id, dimesions, $parent_container);
		}
	};
}(jQuery));