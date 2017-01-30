'use strict';

export default angular.module('materialCrudSqlApp.toggle', [])
		.service('ToggleComponent', ToggleComponentService)
		.name;
	// add ToggleComponent dependencies to inject
	ToggleComponentService.$inject = ['$mdComponentRegistry', '$log', '$q'];

	function ToggleComponentService($mdComponentRegistry, $log, $q) {
		return function (contentHandle) {
			var errorMsg = "ToggleComponent '" + contentHandle + "' is not available!";
			var instance = $mdComponentRegistry.get(contentHandle);

			if (!instance) {
				$log.error('No content-switch found for handle ' + contentHandle);
			}

			return {
				isOpen: isOpen,
				toggle: toggle,
				open: open,
				close: close
			};

			function isOpen() {
				return instance && instance.isOpen();
			}

			function toggle() {
				return instance ? instance.toggle() : $q.reject(errorMsg);
			}

			function open() {
				return instance ? instance.open() : $q.reject(errorMsg);
			}

			function close() {
				return instance ? instance.close() : $q.reject(errorMsg);
			}
		};
	}
