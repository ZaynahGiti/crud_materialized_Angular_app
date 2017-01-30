'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('employee', {
      url: '/employee',
      template: '<employee></employee>'
    })
}
