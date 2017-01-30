'use strict';

class listImage {
	constructor($mdTheming, AlphabetColor) {
		'ngInject'
		var vm = this;
		// $mdTheming(element);
		vm.firstLetter = _.capitalize(vm.string.toString().charAt(0));
		vm.bgColor = AlphabetColor(vm.firstLetter);
	}
}

export default angular.module('materialCrudSqlApp.listImage', [])
.factory('AlphabetColor', function AlphabetColor() {
	var colors = [
		'#f9a43e',
		'#59a2be',
		'#67bf74',
		'#f58559',
		'#e4c62e',
		'#f16364',
		'#2093cd',
		'#ad62a7'
	];
	var numberOfColors = colors.length;

	return getColor;

	function hashCode(str) {
		var hash = 0,
			length = str.length,
			i, chr;

		if (length === 0) {
			return hash;
		}

		for (i = 0; i < length; i++) {
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	}

	function getColor(string) {
		var color = Math.abs(hashCode(string.charAt(0))) % numberOfColors;
		return colors[color];
	}
})
.component('listImage', {
	controller: listImage, 
	template: `<div ng-style="{background: $ctrl.bgColor}"><span>{{$ctrl.firstLetter}}</span></div>`,
	bindings: {string: '@'}
}).name;

	// AlphabetColor.$inject = ['_'];
