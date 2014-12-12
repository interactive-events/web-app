'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:VoteCtrl
 * @description
 * # VoteCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('VoteCtrl', function ($scope, $rootScope, Restangular, $stateParams, $state, $timeout, $location, $http, $cookieStore, $cookies) {

        $rootScope.showHeader = false;

        var accessToken = ($location.search()).access_token;
        console.log('access_token is:', accessToken);
        $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

        // Get the activity
        var baseActivity = Restangular.one('events', $stateParams.eventId).one('activities', $stateParams.activityId);
        baseActivity.get().then(function (data) {
            //TODO Vote or redirect to results
            $scope.activity = data;

            console.log('cookies:', $cookies.hasVoted);
            if ((data.customData.hasVoted === true) || ($cookies.hasVoted)) {
                // user already voted in this poll - go to results-view
                $state.go('view-activity.results');
            } else {
                $scope.showUI = true;
            }
        });

        $scope.submitVote = function (answerId) {
            if(answerId) {
                var vote = {answerId: answerId};
                baseActivity.all('vote').post(vote).then(function (result) {
                    $cookieStore.put('hasVoted', true);
                    $cookies.hasVoted = true;
                    $scope.voteRegistered = true;
                    $timeout($scope.goToResults(), 2000);
                    console.log(result);
                }, function (error) {
                    console.log(error);
                });
            } else {
                $scope.invalid = true;
                $timeout(function(){
                    $scope.invalid = false;
                }, 4000);
            }
        };

        $scope.goToResults = function () {
            $state.go('view-activity.results');
        };

    });


