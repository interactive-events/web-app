'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:SingleeventCtrl
 * @description
 * # SingleeventCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('SingleEventCtrl', function ($scope, $state, $stateParams, $window, Restangular) {


        $scope.eventId = $stateParams.eventId;
        $scope.loaded = false;

        $scope.eventPromise = Restangular.one('events', $scope.eventId).get();
        $scope.eventPromise.then(function (data) {
            $scope.event = data;
            angular.forEach($scope.event.activities, function (activity) {
                activity.customData = angular.fromJson(activity.customData);
            });
            $scope.loaded = true;
            if (isStarted()) {
                $scope.startEvent();

            } else {
                $scope.event.status = {name: 'planned', class: 'default', ongoing: false};
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

        function setupOngoingEvent() {
            $scope.event.status = {name: 'ongoing', class: 'success', ongoing: true};
            /* global io: false */
            var eventSocket = io.connect(Restangular.configuration.baseUrl + '/events/' + $scope.eventId);
            eventSocket.on('new-participant', function (data) {
                console.log("new-participant!", data, $scope.event.currentParticipants, $scope.event.currentParticipants.indexOf(data.userId));
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
                width = 600,
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
            var access_token = 'kjsdhflskdjfhsfllksdjfhlsksldfkjshf',
                user = 'VoteUser',
                urlToShorten = 'http://interactive-events-web-app.s3-website-eu-west-1.amazonaws.com/events/' + eventId + '/activities/' + activityId + '/vote?access_token=' + access_token,
                bitlyAPIUrl = 'https://api-ssl.bitly.com/v3/shorten?access_token=1c0fbcbd4b342099f7bec267360973271bc0c485&longUrl=';

            var xhr = new XMLHttpRequest();
            xhr.open('GET', bitlyAPIUrl + encodeURIComponent(urlToShorten));
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
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
        };

        $scope.closePublicLink = function(){
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
