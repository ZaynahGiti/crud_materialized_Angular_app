'use strict';

describe('Component: EmployeeComponent', function() {
  // load the controller's module
  beforeEach(module('materialCrudSqlApp.employee'));

  var EmployeeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EmployeeComponent = $componentController('employee', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
