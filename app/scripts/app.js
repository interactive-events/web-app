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
        'restangular',
        'highcharts-ng',
        'ui.router',
        'ui.bootstrap'
    ]);

webApp.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    // Enable HTML5 pushstate
    $locationProvider.html5Mode(true);

    $stateProvider.
        state('home', {
            url: '/home',
            templateUrl: '/views/home.html',
            controller: 'HomeCtrl'
        }).
        state('beacons', {
            url: '/beacons',
            templateUrl: '/views/beacons.html',
            controller: 'BeaconsCtrl'
        })
        .state('people', {
            url: '/people',
            templateUrl: '/views/people.html',
            controller: 'PeopleCtrl'
        })
        .state('events', {
            url: '/events',
            templateUrl: '/views/events.html',
            controller: 'EventsCtrl'
        })
        .state('dashboard', {
            url: '/',
            templateUrl: '/views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('new-event', {
            url: '/events/new',
            templateUrl: '/views/newevent.html',
            controller: 'NeweventCtrl'
        })
        // nested states
        // each of these sections will have their own view
        // url will be nested (/events/new/1)
        .state('new-event.step1', {
            url: '/1',
            templateUrl: '/views/new-event-step1.html'
        })
        .state('new-event.step2', {
            url: '/2',
            templateUrl: '/views/new-event-step2.html'
        })
        .state('new-event.step3', {
            url: '/3',
            templateUrl: '/views/new-event-step3.html'
        });

    $urlRouterProvider.otherwise('/404');
});