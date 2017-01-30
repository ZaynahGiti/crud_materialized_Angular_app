'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  
  // set the default palette name
  var defaultPalette = 'blue';
  // define a palette to darken the background of components
  var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});

  $mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
  $mdThemingProvider.setDefaultTheme(defaultPalette);

  // customize the theme
  $mdThemingProvider
    .theme(defaultPalette)
    .primaryPalette(defaultPalette)
    .accentPalette('pink')
    .backgroundPalette('grey-background');

}
