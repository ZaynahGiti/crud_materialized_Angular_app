'use strict';

import filters from '../filters/filters.filter';

class CrudDetailController {
/*@ngInject*/
  constructor($state, Toast, Modal, $stateParams, appConfig, $mdDialog, socket, $scope, $filter, $http){
    var vm = this;
    vm.myDate = new Date();
    vm.header = vm.api;
    vm.$stateParams = $stateParams;
    vm.$mdDialog = $mdDialog;
    vm.$state = $state;
    vm.$filter = $filter;
    vm.$http = $http;
    vm.Toast = Toast;
    vm.Modal = Modal;
    vm.appConfig = appConfig;
    vm.socket = socket;
    vm.header = vm.api;
    var columns = localStorage !== null ? localStorage.columns : null;
    vm.columns = JSON.parse(columns);
    vm.api = localStorage !== null ? localStorage.api : null;
    vm.path = localStorage !== null ? localStorage.path : null;
    vm.api2 = vm.$filter('pluralize')(vm.api);
  }

$onInit(){
  var vm = this;
  var itemId = vm.$stateParams.itemId;

  vm.loading = true;
  vm.$http.get('/api/'+vm.api2+'/'+itemId).then(function(res) {
    vm.loading = false;
    vm.item = res.data;
    vm.socket.syncUpdates(vm.api, vm.item);
  })
  var columns = localStorage !== null ? localStorage.columns : null;
  vm.columns = JSON.parse(columns);
}

  save(item) {
    var vm = this;
    // refuse to work with invalid data
    if(!item){
      vm.Toast.show({ type: 'error', text: 'No item defined.' });
      return;
    }
    vm.$http.patch('/api/'+vm.api2+'/' + item._id, item).then(function(res) {
      vm.Toast.show({ type: 'success', text: 'Saved successfully' });
    }, function(err) {
      vm.Toast.show({ type: 'warn', text: 'Error while updating database' });
    });
  };
  
  handleError(error) { // error handler
    var vm = this;
    vm.loading = false;
    if(error.status === 403){
      vm.Toast.show({ type: 'error', text: 'Not authorised to make changes.' });
    }
    else{
      vm.Toast.show({ type: 'error', text: error.status });
    }
  }
  mediaLibrary(index){
    var vm = this;
    vm.Modal.media()
    .then(function(answer) {
        vm.item[index.field] = answer;
    }, function() {
    });
  }
}

export default angular.module('mcrud.crudDetail', [filters])
  .component('crudDetail', {
    template: require('./detail.html'),
    controller: CrudDetailController,
    controllerAs: 'detail',
    bindings: { api : '<', columns: '<' },
    require: {'parent': '^crudTable'}
  })
  .name;