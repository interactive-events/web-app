'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:BeaconsCtrl
 * @description
 * # BeaconsCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('BeaconsCtrl', function ($scope, Restangular) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Restangular.setBaseUrl('http://private-582d6-interactiveevents.apiary-mock.com');

    var baseBeacons = Restangular.one('beacons');

    $scope.beaconsResponse  = baseBeacons.get().$object;
    console.log($scope.beaconsResponse);

  });
