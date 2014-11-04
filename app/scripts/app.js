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
        'ngRoute',
        'restangular',
        'highcharts-ng',
        'ui.router'
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
        .state('newevent', {
            url: '/events/new',
            templateUrl: '/views/newevent.html',
            controller: 'NeweventCtrl'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('newevent.profile', {
            url: '/profile',
            templateUrl: '/views/form-profile.html'
        })

        // url will be /form/interests
        .state('newevent.interests', {
            url: '/interests',
            templateUrl: '/views/form-interests.html'
        })

        // url will be /form/payment
        .state('newevent.payment', {
            url: '/payment',
            templateUrl: '/views/form-payment.html'
        });

        $urlRouterProvider.otherwise('/404');
});
