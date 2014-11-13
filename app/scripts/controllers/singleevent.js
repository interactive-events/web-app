'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:SingleeventCtrl
 * @description
 * # SingleeventCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('SingleEventCtrl', function ($scope, $stateParams) {
    $scope.eventId = $stateParams.eventId;
  });
