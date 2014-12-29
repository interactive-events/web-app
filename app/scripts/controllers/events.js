'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('EventsCtrl', function ($scope, Restangular) {
        $scope.eventsPromise = Restangular.one('events').get({limit: 100});
        $scope.eventsResponse = $scope.eventsPromise.$object;
    });
