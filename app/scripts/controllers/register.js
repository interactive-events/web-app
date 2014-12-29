'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('RegisterCtrl', function ($scope, Restangular) {
        $scope.registerSubmit = function (name, email, password) {
            var user = {name: name, email: email, password: password};
            Restangular.all('users').post(user).then(function (result) {
                $scope.userCreated = true;
                console.log(result);
            }, function (error) {
                console.log(error);
            });
        };
    });