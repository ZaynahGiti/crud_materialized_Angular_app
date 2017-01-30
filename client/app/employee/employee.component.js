'use strict';

import routes from './employee.routes';

class EmployeeComponent {
  constructor($state) {
    'ngInject';
    this.fields = [
      {field: 'name', title: 'Name', dataType: 'text'},
      {field: 'department', dataType: 'select', options: ['IT', 'PM']},
      {field: 'birthDate', dataType: 'birthDate'},
      {field: 'experience', heading: 'year of experience', dataType: 'number', noEdit: true},
    ];
  }
}

export default angular.module('materialCrudSqlApp.employee', [])
  .config(routes)
  .component('employee', {
    template: require('./employee.html'),
    controller: EmployeeComponent,
    bindings: { }
  })
  .name