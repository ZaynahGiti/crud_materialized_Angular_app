'use strict';

class EditProfileController {
  constructor(Auth, $state, $http, $mdDialog, Upload, $timeout) {
    this.errors = {};
    this.submitted = false;
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.$timeout = $timeout;
    this.$mdDialog = $mdDialog;
    this.Upload = Upload;
    var vm = this;
  }
  saveImage(dataUrl, name){
    var vm = this
    this.Upload.upload({
        url: 'api/media/profile',
        data: {
            file: this.Upload.dataUrltoBlob(dataUrl, name)
        },
    }).then(function (response) {
        vm.$timeout(function () {
            vm.result = response.data;
            vm.submitted = true;
            vm.message = 'Profile image updated.';   
            vm.Auth.updateProfile() // This updates the navbar avatar
            // vm.$state.reload();
        });
    }, function (response) {
        if (response.status > 0) vm.errorMsg = response.status 
            + ': ' + response.data;
    }, function (evt) {
        vm.progress = parseInt(100.0 * evt.loaded / evt.total);
    });
  }
}

export default angular.module('materialCrudSqlApp.editProfile', [])
  .controller('EditProfileController', EditProfileController)
  .name;
