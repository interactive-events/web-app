'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:NeweventCtrl
 * @description
 * # NeweventCtrl
 * Controller of the webAppApp
 */
angular.module('ieventsWebApp')
    .controller('NeweventCtrl', function ($scope) {
        // we will store all of our form data in this object
        $scope.formData = {};
        console.log("New event controller loaded");
        // function to process the form
        $scope.processForm = function () {
            console.log('awesome!');
        };
    });
