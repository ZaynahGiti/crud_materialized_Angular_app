'use strict';
const angular = require('angular');

import uiRouter from 'angular-ui-router';

import routes from './main.routes';

export class MainComponent {
  /*@ngInject*/
  constructor(appConfig) {
    this.pages = [];
    this.pages = appConfig.menu.pages;
  }
  getColor($index) {
    var _d = ($index + 1) % 11;
    var bg = '';

    switch(_d) {
      case 1:       bg = 'red';         break;
      case 2:       bg = 'green';       break;
      case 3:       bg = 'darkBlue';    break;
      case 4:       bg = 'blue';        break;
      case 5:       bg = 'yellow';      break;
      case 6:       bg = 'pink';        break;
      case 7:       bg = 'darkBlue';    break;
      case 8:       bg = 'purple';      break;
      case 9:       bg = 'deepBlue';    break;
      case 10:      bg = 'lightPurple'; break;
      default:      bg = 'yellow';      break;
    }

    return bg;
  }
}

export default angular.module('materialCrudSqlApp.main', [uiRouter])
  .config(routes)
  .component('main', {
    template: require('./main.html'),
    controller: MainComponent
  })
  .name;
