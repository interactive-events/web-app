'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('HomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
