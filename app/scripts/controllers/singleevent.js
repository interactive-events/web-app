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
        $scope.loaded = false;

        $scope.eventPromise = Restangular.one('events', $scope.eventId).get();
        $scope.eventPromise.then(function () {
            $scope.loaded = true;
            if (isStarted()) {
                $scope.event.status = {name: 'ongoing', class: 'success', ongoing: true};
            } else {
                $scope.event.status = {name: 'planned', class: 'default', ongoing: false};
            }
        });

        function isStarted(){
            var now = new Date().getTime();
            if(now < new Date($scope.event.time.start).getTime() || new Date($scope.event.time.end).getTime() < now){
                return false;
            } else {
                return true;
            }
        }

        $scope.event = $scope.eventPromise.$object;
        $scope.event.status = {name: 'planned', class: 'default', ongoing: false};

        $scope.openPresenterView = function () {
            var left = screen.width / 2 - 200,
                top = screen.height / 2 - 250;
            $window.open('/events/123/modules/1/push', '', 'top=' + top + ',left=' + left + ',width=600,height=600');
        };

        $scope.startPoll = function () {
            $('.poll-status').removeClass('label-default').addClass('label-success').html('voting started');
            var baseEvents = Restangular.one('events/1/modules/1/start');
            baseEvents.get();
        };

        $scope.startEvent = function () {
            $scope.eventPromise = Restangular.one('events', $scope.eventId).put({started: true}).then(function () {
                $scope.event.status = {name: 'ongoing', class: 'success', ongoing: true};
                /* global io: false */
                var eventSocket = io.connect('http://interactive-events.elasticbeanstalk.com/events/' + $scope.eventId);
                eventSocket.on('new-participant', function () {
                    $scope.event.currentParticipants.push({});
                });
            }, function () {
                console.log('Error starting event');
            });
        };
    });
