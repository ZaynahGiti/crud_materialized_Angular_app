'use strict';

import filters from '../filters/filters.filter';

export default angular
	.module('materialCrudSqlApp.modal', [filters])
	.factory('Modal', Modal)
	.controller('ModalController', ModalController)
	.name;

function Modal($mdDialog, $state) {
	'ngInject';
	var obj = {};
	obj.create = function (cols, options) {
		return $mdDialog.show({
			controller: 'ModalController as create',
			template: require('./create.html'),
			clickOutsideToClose: false,
			locals: { cols: cols, options: options }
		}).then(transitionTo, transitionTo);
	};


	return obj;
}

function transitionTo(answer) {
	return answer;
}



function ModalController($mdDialog, Toast, $http, options, cols, appConfig, $filter) {
	var vm = this;
	vm.create = createUser;
	vm.close = hideDialog;
	vm.cancel = cancelDialog;
	vm.options = options;
	vm.options.columns = cols;
	vm.title = options.api;
	function createUser(form) {
		if (!vm.item) {
			Toast.show({ type: 'success', text: options.api + ' information insufficient.' });
			return;
		}
		if (vm.item._id || (form && !form.$valid)) {
			return;
		}

		$http.post('/api/' + $filter('pluralize')(options.api), vm.item)
			.then(createUserSuccess)
			.catch(createUserCatch);
		function createUserSuccess(response) {
			var item = vm.item = response.data;
			Toast.show({ type: 'success', text: 'New ' + options.api + ' saved successfully.' });
			vm.close();
		}

		function createUserCatch(err) {
			Toast.show({ type: 'warn', text: 'Error while creating new ' + options.api });
		}
	}

	function hideDialog() {
		$mdDialog.hide();
	}

	function cancelDialog() {
		$mdDialog.cancel();
	}
}
