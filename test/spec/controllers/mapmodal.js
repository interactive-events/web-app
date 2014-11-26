'use strict';

describe('Controller: MapmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('ieventsWebApp'));

  var MapmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapmodalCtrl = $controller('MapmodalCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });*/
});
