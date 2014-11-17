'use strict';

/**
 * @ngdoc overview
 * @name ieventsWebApp
 * @description
 * # ieventsWebApp
 *
 * Main module of the application.
 */
angular
    .module('ieventsWebApp', [
        'ngAnimate',
        'ngTouch',
        'ngCookies',
        'restangular',
        'highcharts-ng',
        'ui.router',
        'ui.bootstrap',
        'cgBusy',
        'btford.socket-io'
    ])

    .config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
        // Enable HTML5 pushstate
        $locationProvider.html5Mode(true);

        $stateProvider.state('app', {
            'abstract': true,
            template: '<ui-view/>',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            }
        }).
            state('app.admin', {
                template: '<ui-view/>',
                abstract: true,
                data: {
                    roles: ['admin']
                }
            }).
            state('app.home', {
                url: '/',
                templateUrl: '/views/home.html',
                controller: 'HomeCtrl'
            }).
            state('app.admin.beacons', {
                url: '/beacons',
                templateUrl: '/views/beacons.html',
                controller: 'BeaconsCtrl'
            })
            .state('app.admin.people', {
                url: '/people',
                templateUrl: '/views/people.html',
                controller: 'PeopleCtrl'
            })
            .state('app.admin.events', {
                url: '/events',
                template: '<ui-view/>',
                abstract: true,
            })
            .state('app.admin.events.list', {
                url: '',
                templateUrl: '/views/events.html',
                controller: 'EventsCtrl'
            })
            .state('app.admin.events.single-event', {
                url: '/:eventId',
                templateUrl: '/views/single-event/single-event.html',
                controller: 'SingleEventCtrl'
            })
            .state('app.admin.events.single-event.activities', {
                url: '/',
                templateUrl: '/views/single-event/activities.html',
                controller: 'SingleEventCtrl'
            })
            .state('app.admin.events.single-event.people', {
                url: '/people',
                templateUrl: '/views/single-event/people.html',
                controller: 'SingleEventCtrl'
            })
            .state('app.admin.events.single-event.beacons', {
                url: '/people',
                templateUrl: '/views/single-event/beacons.html',
                controller: 'SingleEventCtrl'
            })
            .state('app.admin.events.single-event.settings', {
                url: '/people',
                templateUrl: '/views/single-event/settings.html',
                controller: 'SingleEventCtrl'
            })
            .state('app.admin.dashboard', {
                url: '/dashboard',
                templateUrl: '/views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('app.admin.events.new-event', {
                url: '/new',
                templateUrl: '/views/new-event/new-event.html',
                controller: 'NeweventCtrl'
            })
            // nested states
            // each of these sections will have their own view
            // url will be nested (/events/new/1)
            .state('app.admin.events.new-event.step1', {
                url: '/1',
                templateUrl: '/views/new-event/step1.html'
            })
            .state('app.admin.events.new-event.step2', {
                url: '/2',
                templateUrl: '/views/new-event/step2.html'
            })
            .state('app.admin.events.new-event.step3', {
                url: '/3',
                templateUrl: '/views/new-event/step3.html'
            })
            // Login / register / forgot
            .state('app.login', {
                url: '/login',
                templateUrl: '/views/login-register/login.html',
                controller: 'LoginCtrl'
            })
            .state('app.register', {
                url: '/register',
                templateUrl: '/views/login-register/register.html',
                controller: 'RegisterCtrl'
            })
            .state('app.denied', {
                url: '/denied',
                templateUrl: '/views/denied.html',
                controller: function () {
                }
            })
            .state('app.superadmin', {
                url: '/lol',
                template: '<h2>Super crazy admin page</h2>',
                controller: function () {
                },
                data: {
                    roles: ['superadmin']
                }
            })
            .state('app.poll', {
                // For demp purposes, should be under admin section
                url: '/events/:eventId/modules/1/push',
                templateUrl: '/views/poll.html',
                controller: 'PollCtrl'
            });

        $urlRouterProvider.otherwise('/404');
    })

    .run(function ($rootScope, $state, $stateParams, authorization, principal, $cookieStore) {
        $rootScope.auth = principal;
        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            // track the state the user wants to go to; authorization service needs this
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            // if the principal is resolved, do an authorization check immediately. otherwise,
            // it'll be done when the state is resolved.
            if (principal.isIdentityResolved()) {
                authorization.authorize();
            }

            if (!$cookieStore.get('user')) {
                principal.authenticate(null);
            }

            // Go to dashboard instead of home page if logged in
            if (toState.name === 'app.home' && principal.isAuthenticated()) {
                $state.go('app.admin.dashboard');
            }
        });
    })

    .factory('principal',
    function ($q, $http, $timeout, $cookieStore) {
        var _identity,
            _authenticated = false;

        return {
            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            isInRole: function (role) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }

                return _identity.roles.indexOf(role) !== -1;
            },
            isInAnyRole: function (roles) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) {
                        return true;
                    }
                }

                return false;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity !== null;

                if (identity) {
                    $cookieStore.put('user', identity);
                } else {
                    $cookieStore.remove('user');
                }
            },
            identity: function (force) {
                var deferred = $q.defer();

                if (force === true) {
                    _identity = undefined;
                }

                // Check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                if ($cookieStore.get('user')) {
                    _identity = $cookieStore.get('user');
                    _authenticated = true;
                } else {
                    _identity = null;
                    _authenticated = false;
                }

                deferred.resolve(_identity);
                return deferred.promise;

                //TODO Add refresh token stuff here?

                // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
                //                   $http.get('/svc/account/identity', { ignoreErrors: true })
                //                        .success(function(data) {
                //                            _identity = data;
                //                            _authenticated = true;
                //                            deferred.resolve(_identity);
                //                        })
                //                        .error(function () {
                //                            _identity = null;
                //                            _authenticated = false;
                //                            deferred.resolve(_identity);
                //                        });

                // for the sake of the demo, fake the lookup by using a timeout to create a valid
                // fake identity. in reality,  you'll want something more like the $http request
                // commented out above. in this example, we fake looking up to find the user is
                // not logged in
                /*$timeout(function () {
                 _identity = null;
                 _authenticated = false;
                 deferred.resolve(_identity);
                 }, 1000);*/
            }
        };
    }
)
    .factory('authorization', ['$rootScope', '$state', 'principal',
        function ($rootScope, $state, principal) {
            return {
                authorize: function () {
                    return principal.identity()
                        .then(function () {
                            var isAuthenticated = principal.isAuthenticated();
                            if ($rootScope.toState.data && $rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                                if (isAuthenticated) {
                                    $state.go('app.denied');
                                } // user is signed in but not authorized for desired state
                                else {
                                    // user is not authenticated. stow the state they wanted before you
                                    // send them to the signin state, so you can return them when you're done
                                    $rootScope.notAuthorized = true;
                                    $rootScope.returnToState = $rootScope.toState;
                                    $rootScope.returnToStateParams = $rootScope.toStateParams;

                                    // now, send them to the signin state so they can log in
                                    $state.go('app.login');
                                }
                            }
                        });
                }
            };
        }
    ])
// Setup socket.io
    .factory('socket', function (socketFactory) {

        /* global io: false */
        var ioSocket = io.connect('http://interactive-events.elasticbeanstalk.com/socket.io/socket.io.js/events/1/modules/1');
        var socket = socketFactory({
            ioSocket: ioSocket
        });

        return socket;
    })

// Convert ui states into classes that can be applied to <body>
    .
    filter('stateToClasses', function () {
        return function (input) {
            return input.replace(/\./g, ' ');
        };
    });