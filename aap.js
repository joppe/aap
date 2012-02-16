/*global aap*/

// create the aap namespace
var aap = {};

/**
 * @param {Object} global_namespace, the WIndow object
 * @param {jQuery} $
 */
aap.core  = (function (global_namespace, $) {
	'use strict';

	return {
		/**
		 * Get the global namespace
		 *
		 *  @return {Object}
		 */
		getGlobalNamespace: function () {
			return global_namespace;
		},

		/**
		 * 
		 * @param namespace
		 */
		createNamespace: function(namespace) {
			var object_names = namespace.split('.'),
				target = global_namespace;

			$.each(object_names, function (index, object_name) {
				if (aap.utils.isUndefined(target[object_name]) === true) {
					target[object_name] = {};
				}

				target = target[object_name];
			});
		}
	};
}(this, jQuery));