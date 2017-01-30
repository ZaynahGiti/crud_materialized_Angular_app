'use strict';

import ngResource from 'angular-resource';

export default angular.module('materialCrudSqlApp.factory', [ngResource])
  .factory('Employee', function($resource) {
    var obj = {};
    obj = $resource('/api/employees/:id', null, {'update': { method:'PUT' }});
    return obj;
  })
  .factory('Mail', function($resource) {
    return $resource('/api/sendmail/:id');
  })
  .name;