'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:VoteCtrl
 * @description
 * # VoteCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('VoteCtrl', function ($scope, Restangular, $stateParams, $state, $timeout, $location) {

        var accessToken = ($location.search()).access_token;
        console.log('access_token is:', accessToken);
        $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

    // Get the activity
    var baseActivity = Restangular.one('events', $stateParams.eventId).one('activities', $stateParams.activityId);
    baseActivity.get().then(function (data) {
      //TODO Vote or redirect to results
      $scope.activity = data;
      if (data.customData.hasVoted === true) {
        // user already voted in this poll - go to results-view
        $state.go('view-activity.results');
      }
    });

    $scope.submitVote = function (answerId) {

      //var formData = new FormData();
      //formData.append("answerId",angular.toJson(answerId));
      //baseActivity.one('vote').withHttpConfig({ transformRequest: angular.identity }).customPUT("", null, { "Content-Type": undefined }, formData);

      var vote = {answerId: answerId};
      baseActivity.all('vote').post(vote).then(function (result) {
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


