'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the webAppApp
 */
angular.module('ieventsWebApp')
    .controller('NeweventCtrl', function ($scope, $state) {
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        // We store all of our form data in this object
        $scope.formData = {};

        $scope.beacons = [
            {name:'Blue beacon', uuid:'KLhlkuhlkyuglikugli75gl7yKJgokiolnbh'},
            {name:'Red beacon', uuid:'OUHlkvsl8hj93hlIKuhlkuHLkugliuHGLKu9h'},
            {name:'Bacon beacon', uuid:'o8upnao3wuvpobULKUJHLBKH8bhl82hbk8qhdb'},
        ];

        $scope.activityTypes = [
            {name:'Poll', id:'241'},
            {name:'Quiz', id:'441'},
            {name:'Questions', id:'421'},
            {name:'Group assignment', id:'612'},
            {name:'Moderator', id:'264'},
            {name:'Who needs help?', id:'617'}
        ];

        $scope.addNewChoice = function() {
            var newItemNo = $scope.formData.activities.length+1;
            $scope.formData.activities.push({'id':'activity_'+newItemNo});
        };

        $scope.showAddChoice = function(activity) {
            return activity.id === $scope.formData.activities[$scope.formData.activities.length-1].id;
        };

        // Set minimum date to today
        $scope.minDate = new Date();

        // function to process the form
        $scope.processForm = function () {
            alert('Sending POST request to API >>>');
            $state.go('events');
        };
    });
