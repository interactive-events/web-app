'use strict';

/**
 * @ngdoc overview
 * @name ieventsWebApp
 * @description
 * # ieventsWebApp
 *
 * Main module of the application.
 */
var webApp = angular
  .module('ieventsWebApp', [
    'ngAnimate',
    'ngTouch',
    'ngRoute'
  ]);

webApp.config(function($routeProvider, $locationProvider) {
        // Enable HTML5 pushstate
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            }).
            when('/beacons', {
                templateUrl: 'views/beacons.html',
                controller: 'BeaconsCtrl'
            })
            .when('/people', {
                templateUrl: 'views/people.html',
                controller: 'PeopleCtrl'
            })
            .when('/events', {
                templateUrl: 'views/events.html',
                controller: 'EventsCtrl'
            })
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            }).
            otherwise({
                redirectTo: '/404'
            });
    });
