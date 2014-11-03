'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('HeaderCtrl', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
  });
