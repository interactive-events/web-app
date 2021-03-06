'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:SingleeventCtrl
 * @description
 * # SingleeventCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('SingleEventCtrl', function ($scope, $rootScope, $state, $stateParams, $window, Restangular, $interval) {


        $scope.eventId = $stateParams.eventId;
        $scope.loaded = false;

        $scope.eventPromise = Restangular.one('events', $scope.eventId).get();
        $scope.eventPromise.then(function (data) {
            data.completePercent = 0;
            $scope.event = data;
            angular.forEach($scope.event.activities, function (activity) {
                activity.customData = angular.fromJson(activity.customData);
            });
            $scope.loaded = true;
            updateProgress();
            if (isStarted()) {
                $scope.startEvent();
                $interval(updateProgress, 10000);
            } else {
                $scope.event.status = {name: 'planned', class: 'default', ongoing: false};
                var now = new Date().getTime();
                if (new Date($scope.event.time.end).getTime() < now) {
                    $scope.event.status = {name: 'ended', class: 'warning', ongoing: false};
                }
            }
        });

        function isStarted() {
            var now = new Date().getTime();
            if (now < new Date($scope.event.time.start).getTime() || new Date($scope.event.time.end).getTime() < now) {
                return false;
            } else {
                return true;
            }
        }

        function updateProgress() {
            var start = new Date($scope.event.time.start).getTime();
            var end = new Date($scope.event.time.end).getTime();
            var now = new Date().getTime();
            if (!isStarted()) {
                if (now > end) {
                    $scope.event.completePercent = 100;
                } else {
                    $scope.event.completePercent = 0;
                }
                return;
            }
            $scope.event.completePercent = Math.round(( now - start ) / ( end - start ) * 100);
        }

        function setupOngoingEvent() {
            $scope.event.status = {name: 'ongoing', class: 'success', ongoing: true};
            /* global io: false */
            var eventSocket = io.connect(Restangular.configuration.baseUrl + '/events/' + $scope.eventId);
            eventSocket.on('new-participant', function (data) {

                console.log('new-participant!', data, $scope.event.currentParticipants, $scope.event.currentParticipants.indexOf(data.userId));
                if ($scope.event.currentParticipants.indexOf(data.userId) < 0) {
                    $scope.event.currentParticipants.push(data.userId);
                    $scope.$apply();
                }
            });
        }

        $scope.event = $scope.eventPromise.$object;
        $scope.event.status = {name: 'planned', class: 'default', ongoing: false};

        $scope.openPresenterView = function () {
            var left = screen.width / 2 - 200,
                top = screen.height / 2 - 250,
                width = 780,
                height = 600,
                url = '/events/' + $scope.eventId + '/presenter/list';
            $window.open(url, '', 'top=' + top + ',left=' + left + ',width=' + width + ',height=' + height);
            //$window.location.href = url;
        };

        $scope.startPoll = function (activityId) {
            console.log(activityId);
            var theActivity = Restangular.one('events', $stateParams.eventId).one('activities', activityId);
            theActivity.state = 'start';
            theActivity.put();
            //$('.poll-status').removeClass('label-default').addClass('label-success').html('voting started');
        };

        $scope.getPublicLink = function (eventId, activityId) {
            var token = Restangular.all('oauth/token'),
                usr = 'VoteUser',
                pass = 'VoteUser',
                tokenRequest = {
                    grant_type: 'password',
                    client_id: $rootScope.clientId,
                    client_secret: $rootScope.clientSecret,
                    username: usr,
                    password: pass
                };
            $scope.loginPromise = token.post(tokenRequest);
            $scope.loginPromise.then(function (tokenResponse) {
                var access_token = tokenResponse.access_token,
                    urlToShorten = 'http://interactive-events-web-app.s3-website-eu-west-1.amazonaws.com/events/' + eventId + '/activities/' + activityId + '/vote?access_token=' + access_token,
                    bitlyAPIUrl = 'https://api-ssl.bitly.com/v3/shorten?access_token=1c0fbcbd4b342099f7bec267360973271bc0c485&longUrl=';

                var xhr = new XMLHttpRequest();
                xhr.open('GET', bitlyAPIUrl + encodeURIComponent(urlToShorten));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('Generated public link: ', xhr.responseText);
                            $scope.publicLinkGenerated = true;
                            $scope.publicLink = JSON.parse(xhr.responseText).data.url;
                            $scope.$apply();
                        } else {
                            console.log('Oops', xhr);
                        }
                    }
                };
                xhr.send();
            });
        };

        $scope.closePublicLink = function () {
            $scope.publicLinkGenerated = false;
        };

        $scope.startEvent = function () {
            Restangular.one('events', $scope.eventId).put({started: false}).then(function () {
                setupOngoingEvent();
            }, function () {
                console.log('Error starting event');
            });
        };
    });
