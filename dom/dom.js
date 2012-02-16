/*global aap, jQuery*/

aap.dom = (function ($) {
	'use strict';

	var cached_elements = {};

	return {
		getCachedElement: function (selector) {
			if (aap.utils.isUndefined(cached_elements[selector])) {
				cached_elements[selector] = $(selector);
			}

			return cached_elements[selector];
		}
	};
}(jQuery));