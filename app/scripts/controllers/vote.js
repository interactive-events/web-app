'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:VoteCtrl
 * @description
 * # VoteCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('VoteCtrl', function ($scope, Restangular, $stateParams, $state, $timeout) {
        // Get the activity
        var baseActivity = Restangular.one('events', $stateParams.eventId);
        baseActivity.one('activities', $stateParams.activityId).get().then(function (data) {
          //TODO Vote or redirect to results
          $scope.activity = data;
          if (data.customData.hasVoted === true) {
            // user already voted in this poll - go to results-view
            $state.go('view-activity.results');
          }
        });

    $scope.submitVote = function (answerId) {
      var vote = {answerId: answerId};

      baseActivity.one('vote').put(vote).then(function (result) {
        $scope.voteRegistered = true;
        $timeout($scope.goToResults(), 2000);
        console.log(result);
      }, function (error) {
        console.log(error);
      });
    };

    $scope.goToResults = function () {
      $state.go('view-activity.results');
    };

  });


