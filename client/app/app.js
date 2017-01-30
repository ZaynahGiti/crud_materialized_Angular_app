'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
// import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import ngMaterial from 'angular-material';
import ngMdIcons from 'angular-material-icons';

// import ngValidationMatch from 'angular-validation-match';

import 'angular-material/angular-material.css';
import 'angular-material-icons/angular-material-icons.css';


import { routeConfig } from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import main from './main/main.component';

import './app.scss';

angular.module('materialCrudSqlApp', ['btford.socket-io', _Auth, account, navbar, footer, main, constants, socket, util, ngMaterial, ngMdIcons
  ])
  .config(routeConfig)
  
  .run(function($rootScope, $location, Auth) {
    'ngInject';
   
    // Inject Material CRUD into title
    $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
      if(toState.title){
        window.document.title = toState.title + ' - Material CRUD';
      }else if(toState.name != 'crud.detail'){
        var input = toState.name;
        input = input.replace(/([A-Z])/g, ' $1');
        input = input[0].toUpperCase() + input.slice(1);
        window.document.title = input + ' - Material CRUD';
      }
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['materialCrudSqlApp'], {
      strictDi: true
    });
  });
