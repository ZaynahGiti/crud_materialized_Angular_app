'use strict';

import routes from './admin.routes';
import crud from './../../components/crud-table/crud.component';

class AdminComponent {
  /*@ngInject*/
  constructor(User, appConfig) {
    var userRoles = appConfig.userRoles || [];
    this.no = {add: true, copy: true};
    this.fields = [
      {field: 'name'},
      {field: 'role', dataType: 'select', options: userRoles},
      {field: 'comission', heading: 'Comission %', dataType: 'number'}
    ];
    if(appConfig.demo)
      this.fields.push({field: 'null', heading: 'email (Hidden in demo mode)'})
    else
      this.fields.push({field: 'email'})

    this.fields.push({field: 'provider', noEdit: true})
  }
}

export default angular.module('materialCrudSqlApp.admin', [crud])
  .config(routes)
  .component('admin', {
    template: `<crud-table api='user' fields='$ctrl.fields' no='$ctrl.no' path='admin'></crud-table>`,
    controller: AdminComponent
  })
  .name;
