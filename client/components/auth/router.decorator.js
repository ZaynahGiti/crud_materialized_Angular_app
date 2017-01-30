'use strict';

export function routerDecorator($rootScope, $transitions, $timeout, Auth, LoginModal, Toast, $q) {
  'ngInject';

  // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
  $transitions.onStart({}, (trans) => {
    let nextParams = trans.params();
    let next = trans.to();
    var $state = trans.router.stateService;
    if (!next.authenticate) { // If it is a public route
      return;
    }

    // Routes that require specific roles
    if (typeof next.authenticate === 'string') {
      Auth.hasRoleAsync(next.authenticate, function (is) {
        if (!is) {
          LoginModal.show(next.name);
          Toast.show({ type: 'error', text: 'You do not have priviledge to access the requested page' });
        }
      });
    } else {
      // Routes that require only authentication without any specific roles
      Auth.isLoggedInAsync(function (is) {
        if (!is) {
          LoginModal.show(next.name);
          $timeout(function(){$state.go('/');});
          return $q.reject('User not logged in. Redirecting to login page.');
          // return $state.go("/");
          // return false;
        }
      });
    }
  });
}
