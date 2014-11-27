'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('NeweventCtrl', function ($scope, $state, $modal, Restangular) {
        $scope.open = function ($event) {
            $scope.opened = !$scope.opened;
            $event.preventDefault();
            $event.stopPropagation();
        };

        // We store all of our form data in this object
        $scope.formData = {};
        $scope.eventCreated = false;

        $scope.beacons = [
            {id:'XXX', name: 'Red beacon', uuid: 'OUHlkvsl8hj93hlIKuhlkuHLkugliuHGLKu9h'},
            {id:'546da9941125e00000f3a0f3' , name: 'iPhone beacon'},
            {id:'YYY', name: 'Bacon beacon', uuid: 'o8upnao3wuvpobULKUJHLBKH8bhl82hbk8qhdb'},
        ];

        $scope.modules = [];
        $scope.modules['546da619aebf240000d8a1fe'] = { name: 'Poll' };

        $scope.addNewChoice = function () {
            var newItemNo = $scope.formData.activities.length + 1;
            $scope.formData.activities.push({'id': 'activity_' + newItemNo});
        };

        $scope.showAddChoice = function (activity) {
            return activity.id === $scope.formData.activities[$scope.formData.activities.length - 1].id;
        };

        // Set minimum date to today
        $scope.minDate = new Date();


        // Google map modal
        $scope.openMapModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl: '/views/new-event/mapModal.html',
                controller: 'MapmodalCtrl',
                size: size,
                resolve: {
                    location: function () {
                        return $scope.mapLocation;
                    }
                }
            });

            modalInstance.result.then(function (location) {
                console.log(location);
                if (!$scope.formData.location) {
                    $scope.formData.location = {};
                }
                $scope.formData.location.coordinates = location;
            }, function () {
                console.log('Location modal dismissed at: ' + new Date());
            });
        };


        $scope.openNewActivityModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl: '/views/new-event/newActivityModal.html',
                controller: 'NeweventaddactivitymodalCtrl',
                size: size
            });

            modalInstance.result.then(function (newActivity) {
                if (!$scope.formData.activities) {
                    $scope.formData.activities = [];
                }
                $scope.formData.activities.push(newActivity);
            }, function () {
                console.log('New activity modal dismissed at: ' + new Date());
            });
        };

        $scope.usersResponse = Restangular.one('users').get().$object;

        $scope.selectPerson = function(person) {
            if(!$scope.formData.invitedUsers){
                $scope.formData.invitedUsers = [];
            }
            $scope.formData.invitedUsers.push(person.id);
        };

        // Sending
        $scope.processForm = function () {
            var baseEvents = Restangular.all('events');
            baseEvents.post($scope.formData).then(function(response){
                $scope.eventCreated = true;
                $scope.createdEventId = response;
            },function(error){
                console.log(error);
            });
        };
    });
