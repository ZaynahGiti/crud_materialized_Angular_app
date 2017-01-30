'use strict';

import LoginModal from './../login-modal/modal.service';
import AdminComponent from './../../app/admin/admin.component';
import DocComponent from './../../app/doc/doc.component';
import MediaComponent from './../../app/media/media.component';
import BookComponent from './../../app/book/book.component';
import ContactComponent from './../../app/contact/contact.component';
import TaskComponent from './../../app/task/task.component';
import CustomerComponent from './../../app/customer/customer.component';
import MovieComponent from './../../app/movie/movie.component';

class menuComponent {
  constructor(ToggleComponent, Auth, appConfig, LoginModal, CpModal, $state, $mdMedia) {
    'ngInject';
    var vm = this;
    vm.$state = $state;
    vm.menu = appConfig.menu;
    vm.Auth = Auth;
    vm.LoginModal = LoginModal;
    vm.CpModal = CpModal;
  }
  $onInit(){
    var vm = this
    vm.isLoggedIn = vm.Auth.isLoggedInSync;
    vm.isAdmin = vm.Auth.isAdminSync;
    vm.getCurrentUser = vm.Auth.getCurrentUserSync;
    vm.hasRole = vm.Auth.hasRoleSync;
  }
  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev)
  }
  showLogin() {
    this.LoginModal.show(this.$state.current.name)
  }
  showCp() {
    this.CpModal.show()
  }
}

export default angular.module('materialCrudSqlApp.menu', [LoginModal, DocComponent, MediaComponent, AdminComponent,
BookComponent, ContactComponent, TaskComponent, CustomerComponent, MovieComponent])
  .component('menu', {
    template: `
    <md-button aria-label="Login / Signup" ng-click="$ctrl.showLogin()" ng-if="!$ctrl.isLoggedIn()">
      <ng-md-icon icon="person" md-menu-align-target></ng-md-icon>
      <span hide-xs>Login / Signup</span>
    </md-button>
    <md-menu>
    <md-button ng-click="$ctrl.openMenu($mdOpenMenu, $event)"  ng-show="$ctrl.isLoggedIn()">
      <ng-md-icon icon="face" md-menu-align-target ng-if="!$ctrl.getCurrentUser().avatar"></ng-md-icon>
      <md-button class="md-fab" ng-if="$ctrl.getCurrentUser().avatar" aria-label="User Profile Image">
        <img src="{{$ctrl.getCurrentUser().avatar}}" class="">
      </md-button>
      <!--<md-icon class="avatar-icon" md-svg-icon="avatar:svg-{{ (0 + 1) % 11 }}"></md-icon>-->
      <span hide-xs>{{$ctrl.getCurrentUser().name | labelCase}}</span>
      <ng-md-icon icon="more_vert"></ng-md-icon>
    </md-button>
    <md-menu-content width="4" class="navMenu" ng-show="$ctrl.menu">

<!-- // Admin Pages -->
      <md-subheader ng-if="$ctrl.isLoggedIn()">{{$ctrl.getCurrentUser().name | labelCase}}</md-subheader>
      <md-menu-item ng-repeat="item in $ctrl.menu.pages" ui-sref-active="active" ng-if="$ctrl.isLoggedIn() && item.authenticate && $ctrl.hasRole(item.role)" ui-sref="{{item.url}}">
        <md-button aria-label="{{item.text}}">
          <ng-md-icon icon="{{item.icon}}" md-menu-align-target></ng-md-icon>
          {{item.text}}
        </md-button>
      </md-menu-item>

<!-- // Public Pages -->
      <md-menu-item ng-repeat="item in $ctrl.menu.pages" ui-sref-active="active" ng-if="!item.authenticate" ui-sref="{{item.url}}">
        <md-button aria-label="{{item.text}}">
          <ng-md-icon icon="{{item.icon}}" md-menu-align-target></ng-md-icon>
          {{item.text}}
        </md-button>
      </md-menu-item>

<!-- // User Management -->
      <md-subheader ng-if="$ctrl.isLoggedIn()"> User</md-subheader>
      <md-menu-item ng-if="$ctrl.isLoggedIn() && $ctrl.hasRole('user')" >
        <md-button aria-label="Change Password" ng-click="$ctrl.showCp()">
          <ng-md-icon icon="lock" md-menu-align-target></ng-md-icon>
          Change Password
        </md-button>
      </md-menu-item>
      <md-menu-item ng-repeat="item in $ctrl.menu.user" ui-sref-active="active" ng-if="$ctrl.isLoggedIn() && $ctrl.hasRole(item.role)" ui-sref="{{item.url}}">
        <md-button aria-label="{{item.text}}">
          <ng-md-icon icon="{{item.icon}}" md-menu-align-target></ng-md-icon>
          {{item.text}}
        </md-button>
      </md-menu-item>

    </md-menu-content>
  </md-menu>
    `,
    controller: menuComponent
})
.name

