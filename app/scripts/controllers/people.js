'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('PeopleCtrl', function ($scope, Restangular) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        Restangular.setBaseUrl('http://private-582d6-interactiveevents.apiary-mock.com');

        var basePeople = Restangular.one('users');

        $scope.peoplePromise = basePeople.get();
        $scope.peopleResponse = $scope.peoplePromise.$object;

    });
