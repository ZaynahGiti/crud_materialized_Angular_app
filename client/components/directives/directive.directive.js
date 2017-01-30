'use strict';

export default angular.module('materialCrudSqlApp.directives', [])

.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
})

    .directive('onlyNumbers', function() {
        return function(scope, element, attrs) {
            var keyCode = [8,9,13,37,39,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,110,190];
            element.bind('keydown', function(event) {
                if(_.indexOf(keyCode, event.which ) === -1) {
                    scope.$apply(function(){
                        scope.$eval(attrs.onlyNum);
                        event.preventDefault();
                    });
                    event.preventDefault();
                }

            });
        };
    })

    .directive('focusMe', function($timeout, $parse) {
      return {
        link: function(scope, element, attrs) {
          var model = $parse(attrs.focusMe);
          scope.$watch(model, function(value) {
            if(value === true) {
              $timeout(function() {
                element[0].focus();
              });
            }
          });
          // on blur event:
          element.bind('blur', function() {
             scope.$apply(model.assign(scope, false));
          });
        }
      };
    })
    .directive('ngPrism',['$interpolate', function ($interpolate) {
        return {
          restrict: 'E',
          template: '<pre><code ng-transclude></code></pre>',
          replace:true,
          transclude:true
        };
    }])
    .name;