'use strict';

class submitButtonComponent {
  /*@ngInject*/
  constructor() {
    this.icon = this.icon || 'save'
    this.disabled = this.disabled || false
  }
}

export default angular.module('materialCrudSqlApp.submitButton', [])
  .component('submitButton', {
    template: `
    <div layout="column" layout-align="center stretch">
	    <md-button type="submit" class="md-raised circular-progress-button md-primary" ng-disabled="!$ctrl.form.$valid || $ctrl.errLength > 0 || $ctrl.loading || $ctrl.disabled" aria-label="{{$ctrl.text}}">
      <div flex></div>
				<span layout="row" layout-align="center center">
					<ng-md-icon icon="{{$ctrl.icon}}" ng-hide="$ctrl.loading"></ng-md-icon>
					<md-progress-circular md-mode="indeterminate" md-diameter="25" ng-show="$ctrl.loading" class="md-accent md-hue-1"></md-progress-circular>
					<span>{{$ctrl.text}}</span>
				</span>
        <div flex></div>
	    </md-button>
		</div>
    `,
    bindings: { 
      loading: '<', // Read only angular expression
      form: '<', 
      text: '@?', // String
      icon: '@?', 
      disabled: '<' // The condition on which button will be disabled. Required mainly for checkout page
    },
    controller: submitButtonComponent
})
.name;
