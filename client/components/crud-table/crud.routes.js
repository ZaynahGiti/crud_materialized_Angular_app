'use strict';

export default function($stateProvider) {
  'ngInject';
  
    $stateProvider
    .state({ 
      name: 'crud',
      url: '/crud', 
      template: '<crud-table></crud-table>'
    })    
    .state({ 
      name: 'crud.detail', 
      url: '/{path}/detail/{itemId}', 
      params: { api: '', columns : { array : true} },
      template: '<crud-detail></crud-detail>'
    });
}