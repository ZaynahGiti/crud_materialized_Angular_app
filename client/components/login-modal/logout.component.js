'use strict';

const angular = require('angular');
export class LogoutComponent {
    /*@ngInject*/
    constructor($state, Auth) {
        this.Auth = Auth;
        this.$state = $state;
    }

    $onInit() {
        var referrer = this.$state.params.referrer || this.$state.current.referrer || '/';
        this.Auth.logout();
        this.$state.go(referrer);
    }
}

export default angular.module('materialCrudSqlApp.logoutComponent', [])
    .component('logoutComponent', {
        controller: LogoutComponent
    })
    .name;