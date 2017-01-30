'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('logout', {
      url: '/logout?referrer',
      referrer: '/',
      component: 'logoutComponent'
    })
    .state('forgot', {
      url: '/forgot?email',
      template: require('./password/forgot.html'),
      controller: 'PasswordController',
      controllerAs: 'forgot',
      title: 'Password Recovery'
    })
    .state('reset', {
      url: '/reset/:token',
      template: require('./password/reset.html'),
      controller: 'PasswordController',
      controllerAs: 'reset',
      title: 'Reset Password'
    })
    .state('edit-profile', {
      url: '/edit-profile',
      template: require('./edit-profile/edit-profile.html'),
      controller: 'EditProfileController',
      controllerAs: 'profile',
      title: 'Edit Profile',
      authenticate: true
    });
}
