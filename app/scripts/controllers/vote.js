'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:VoteCtrl
 * @description
 * # VoteCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('VoteCtrl', function ($scope, Restangular, $stateParams, $state) {
        // Get the activity
        Restangular.one('events', $stateParams.eventId).one('activities', $stateParams.activityId).get().then(function (data) {
            //TODO Vote or redirect to results
            // $state.go(...)
        });
  });