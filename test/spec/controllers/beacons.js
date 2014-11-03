'use strict';

describe('Controller: BeaconsCtrl', function () {

  // load the controller's module
  beforeEach(module('ieventsWebApp'));

  var BeaconsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeaconsCtrl = $controller('BeaconsCtrl', {
      $scope: scope
    });
  }));

});
