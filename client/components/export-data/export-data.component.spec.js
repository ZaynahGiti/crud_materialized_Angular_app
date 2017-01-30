'use strict';

describe('Component: exportData', function() {
  // load the component's module
  beforeEach(module('materialCrudSqlApp.exportData'));

  var exportDataComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    exportDataComponent = $componentController('exportData', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
