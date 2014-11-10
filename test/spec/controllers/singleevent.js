'use strict';

describe('Controller: SingleEventCtrl', function () {

  // load the controller's module
  beforeEach(module('ieventsWebApp'));

  var SingleeventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleeventCtrl = $controller('SingleEventCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });*/
});
