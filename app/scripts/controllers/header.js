'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('HeaderCtrl', function ($rootScope, $scope, $state, $location, principal) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.logout = function(){
            principal.authenticate(null);
            $rootScope.user = null;
            $state.go('app.home');
        };
  });
