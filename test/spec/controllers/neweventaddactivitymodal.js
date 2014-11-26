'use strict';

describe('Controller: NeweventaddactivitymodalCtrl', function () {

  // load the controller's module
  beforeEach(module('ieventsWebApp'));

  var NeweventaddactivitymodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NeweventaddactivitymodalCtrl = $controller('NeweventaddactivitymodalCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });*/
});
