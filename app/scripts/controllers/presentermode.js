'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:PresentermodeCtrl
 * @description
 * # PresentermodeCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('PresentermodeCtrl', function ($scope, $stateParams, Restangular, Fullscreen) {
        $scope.eventId = $stateParams.eventId;
        $scope.loaded = false;

        $scope.eventPromise = Restangular.one('events', $scope.eventId).get();
        $scope.eventPromise.then(function (data) {
            $scope.event = data;
            angular.forEach($scope.event.activities, function (activity) {
                activity.customData = angular.fromJson(activity.customData);
            });
            $scope.loaded = true;
        });

        $scope.fs = Fullscreen;
        $scope.toggleFullScreen = function () {

            if (Fullscreen.isEnabled()) {
                Fullscreen.cancel();
            }
            else {
                Fullscreen.all();
            }
        };
    });
