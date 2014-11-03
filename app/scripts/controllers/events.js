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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    Restangular.setBaseUrl('http://private-582d6-interactiveevents.apiary-mock.com');

    var baseEvents = Restangular.all('events');

    /*baseEvents.get().then(function(response) {
      $scope.allEvents = response;
      console.log(response);
    });*/

    //$scope.oneEvent = Restangular.one('events', '1');

    $scope.events = baseEvents.getList().$object;

  });
