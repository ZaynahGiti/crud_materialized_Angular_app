'use strict';

import ngMessages from 'angular-messages';
import sequelizeError from '../sequelize-error/sequelize-error.directive';
import submitButton from '../submit-button/submit-button.component';
import LogoutComponent from './logout.component';

export default angular
    .module('materialCrudSqlApp.LoginModal', [ngMessages, sequelizeError, submitButton, LogoutComponent])
    .factory('LoginModal', LoginModal)
    .factory('CpModal', CpModal)
    .controller('LoginModalController', LoginModalController)
    .controller('SignUpModalController', SignUpModalController)
    .controller('CpModalController', CpModalController)
    .controller('tabsCtrl', tabsCtrl)
    .name;

function tabsCtrl($scope) {
    this.onTabSelected = function (tab) {
        this.tab = tab
    }
}
function CpModal($mdDialog) {
    var obj = {};
    obj.show = function () {
        $mdDialog.show({
            controller: 'CpModalController as cp',
            template: require('./cp.html'),
            clickOutsideToClose: false,
            parent: angular.element(document.body)
        }).then(function (answer) {
            // this.status = 'You closed the dialog.';
        }, function () {
            // this.status = 'You cancelled the dialog.';
        });
    };
    return obj;
}

function LoginModal($mdDialog, $state) {
    var obj = {};
    obj.show = function (nextRoute, reload) {
        $mdDialog.show({
            template: require('./index.html'),
            clickOutsideToClose: false,
            parent: angular.element(document.body),
            openFrom: { top: 500, width: 30, height: 80 },
            closeTo: { left: 1500 }
        }).then(function (answer) {
            $state.go(nextRoute, null, { reload: true }); // Should be refreshed, else the user info will not be attached
        }, function () {
        });
    };
    return obj;
}

function CpModalController($mdDialog, Toast, Auth, appConfig) {
    this.errors = {};
    this.submitted = false;
    this.appConfig = appConfig;
    this.Toast = Toast;
    this.Auth = Auth;
    this.close = function () {
        $mdDialog.cancel();
    };
    this.changePassword = function (form) {
        var vm = this;
        this.loading = true;
        this.submitted = true;
        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {
                    this.message = 'Password successfully changed.';
                    $mdDialog.hide();
                    this.loading = false;
                })
                .catch(() => {
                    form.password.$setValidity('sequelize', false);
                    this.errors.other = 'Incorrect password';
                    this.message = 'Current Password is Incorrect';
                    this.loading = false;
                });
        } else {
            this.Toast.show({ type: 'error', text: 'Error occured while changing password' });
        }
    }
}
function SignUpModalController($mdDialog, Auth) {
    this.errors = {};
    this.signupSelected = true
    this.submitted = false;
    this.Auth = Auth;
    this.close = close;
    this.register = register;
    function close() {
        $mdDialog.cancel();
    }
    function register(form) {
        this.submitted = true;
        if (form.$valid) {
            this.loading = true;
            this.Auth.createUser({
                name: this.user.name,
                email: this.user.email,
                password: this.user.password
            })
                .then(() => {
                    this.loading = false;
                    $mdDialog.hide();
                })
                .catch(err => {
                    err = err.data;
                    this.errors = {};
                    this.loading = false;
                    // Update validity of form fields that match the sequelize errors
                    if (err.name) {
                        angular.forEach(err.errors, field => {
                            form[field.path].$setValidity('sequelize', false);
                            this.errors[field.path] = field.message;
                        });
                    }
                });
        }
    }
}
function LoginModalController($mdDialog, Auth, $state) {
    var vm = this;
    vm.create = createUser;
    vm.login = login;
    vm.close = close;
    vm.goForgot = goForgot;
    vm.$state = $state;
    vm.user = { email: 'admin@codenx.com', password: 'codenx' };
    vm.errors = {};
    vm.submitted = false;
    vm.Auth = Auth;

    function goForgot(params) {
        close();
        $state.go('forgot', params);
    }
    function close() {
        $mdDialog.cancel();
    }
    function createUser(form) {

    }
    function login(form) {
        this.submitted = true;
        if (form.$valid) {
            this.loading = true;
            this.Auth.login({
                email: this.user.email,
                password: this.user.password
            })
                .then(() => {
                    this.loading = false;
                    $mdDialog.hide();
                })
                .catch(err => {
                    this.errors.other = err.message;
                    this.loading = false;
                });
        }
    }
}
