'use strict';
/* eslint no-sync: 0 */
import menu from './../menu/menu.component';
import ToggleComponent from './../toggle-component/toggle-component.service';

export class NavbarComponent {
  /*@ngInject*/
  constructor(Auth, $state, $mdMedia, ToggleComponent, appConfig) {
    var vm = this
    vm.isLoggedIn = Auth.isLoggedInSync;
    vm.isAdmin = Auth.isAdminSync;
    vm.getCurrentUser = Auth.getCurrentUserSync;
    vm.appConfig = appConfig
    vm.icon = vm.icon || 'save'
    vm.disabled = vm.disabled || false
    vm.Auth = Auth
    vm.ToggleComponent = ToggleComponent
    vm.hasRole = Auth.hasRole;
    vm.$mdMedia = $mdMedia;
    vm.currentUser = Auth.getCurrentUser()
    vm.isCollapsed = true
    vm.isCollapsed1 = true
  }


  toggle(item, list) {
    if (angular.isUndefined(list)) list = []
    var idx = list.indexOf(item)
    if (idx > -1) list.splice(idx, 1)
    else list.push(item)
    this.filter()
  }
  openFilter() {
    this.ToggleComponent('filtermenu').open()
  }
}

export default angular.module('directives.navbar', [menu, ToggleComponent])
  .component('navbar', {
    template: `
    <md-toolbar class="md-whiteframe-2dp">
      <div class="md-toolbar-tools navbar" layout="row" layout-align="space-between center">
        <h3><a ui-sref="/">Material CRUD</a></h3>
        <menu style="padding-left: 0;"></menu> 
      </div>
    </md-toolbar>
    `,
    controller: NavbarComponent,
    bindings: {
      leftmenu: '<'
    }
  })
  .name;
