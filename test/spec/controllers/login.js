'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('webAppApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('one should be one', function () {
    expect(1).toBe(1);
  });
});
