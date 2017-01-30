'use strict';

export default angular
	.module('materialCrudSqlApp.toast', [])
	.service('Toast', ToastService)
	.controller('ToastController', ToastController)
	.name

ToastService.$inject = ['$mdToast'];

function ToastService($mdToast) {

	return {
		show: showToast,
		hide: hideToast
	};

	function showToast(content, options) {
		if (!options) {
			options = {
				hideDelay: 3030,
				parent: '.toast-container',
				position: 'bottom',
				controller: 'ToastController',
				controllerAs: 'vm',
				template: require('./toast.html'),
				locals: {
					type: content.type || 'info',
					text: content.text || content,
					link: content.link || false
				}
			};

			// set defaults for content.type warn
			if (content.type && content.type === 'warn') {
				options.hideDelay = 0;
			} else if (content.type && content.type === 'success') {
				options.hideDelay = 5050;
			}
		}

		return $mdToast.show(options);
	}

	function hideToast() {
		return $mdToast.hide();
	}
}

ToastController.$inject = ['$mdToast', '$state', 'type', 'text', 'link'];

function ToastController($mdToast, $state, type, text, link) {
	var vm = this;
	vm.text = text;
	vm.link = link;
	vm.type = type;

	// functions (documented below)
	vm.showItem = showItem;
	vm.close = closeToast;
	function showItem() {
		vm.close();
		$state.go(vm.link.state, vm.link.params);
	}

	function closeToast() {
		$mdToast.hide();
	}
}