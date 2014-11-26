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
        var baseEvents = Restangular.one('events');

        $scope.eventsPromise = baseEvents.get();
        $scope.eventsResponse = $scope.eventsPromise.$object;

        /*baseEvents.get().then(function(response) {
         $scope.allEvents = response;
         console.log(response);
         });*/

        //$scope.oneEvent = Restangular.one('events', '1');

        // get events/id
    });
