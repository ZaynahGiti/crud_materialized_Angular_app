'use strict';

describe('Component: menu', function() {
  // load the component's module
  beforeEach(module('materialCrudSqlApp.menu'));

  var menuComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    menuComponent = $componentController('menu', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
