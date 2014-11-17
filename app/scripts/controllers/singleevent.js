'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:SingleeventCtrl
 * @description
 * # SingleeventCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('SingleEventCtrl', function ($scope, $stateParams, $window, Restangular) {
        $scope.eventId = $stateParams.eventId;

        $scope.openPresenterView = function () {
            var left = screen.width / 2 - 200,
                top = screen.height / 2 - 250;
                $window.open('/events/123/modules/1/push', '', 'top=' + top + ',left=' + left + ',width=600,height=600');
        };

        $scope.startPoll = function () {
            $('.poll-status').removeClass('label-default').addClass('label-success').html('voting started');
            Restangular.setBaseUrl('http://interactive-events.elasticbeanstalk.com/');
            var baseEvents = Restangular.one('events/1/modules/1/start');
            baseEvents.get();
        };
    });
