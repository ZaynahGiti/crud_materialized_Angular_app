'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('/', {
      url: '/',
      template: '<main></main>',
      title:'MySQL Based Material Designed Employee CRUD Table'
    });
}
