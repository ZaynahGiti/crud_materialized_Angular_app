'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import password from './password/password.controller';
import editProfile from './edit-profile/edit-profile.controller';
import oauthButtons from '../../components/oauth-buttons';

export default angular.module('materialCrudSqlApp.account', [uiRouter, oauthButtons, password, editProfile])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && current.name != 'crud.detail' && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
