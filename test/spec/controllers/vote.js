'use strict';

describe('Controller: VoteCtrl', function () {

  // load the controller's module
  beforeEach(module('ieventsWebApp'));

  var VoteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VoteCtrl = $controller('VoteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
