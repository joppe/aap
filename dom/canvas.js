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
				if (aap.utils.isUndefined(type) === true) {
					type = '2d';
				}

				return $element.get(0).getContext(type);
			},

			clear: function (context_type) {
				var context = canvas.getContext(context_type);

				context.clearRect(0, 0, dimesions.width, dimesions.height);
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