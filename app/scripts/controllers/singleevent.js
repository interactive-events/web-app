'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:SingleeventCtrl
 * @description
 * # SingleeventCtrl
 * Controller of the webAppApp
 */
angular.module('ieventsWebApp')
  .controller('SingleEventCtrl', function ($scope, $stateParams) {
    $scope.eventId = $stateParams.eventId;
  });
