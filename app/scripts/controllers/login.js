'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $state, Restangular, $cookieStore, principal) {
    $rootScope.wrongCredentials = false;

    if (principal.isAuthenticated()) {
      if ($rootScope.returnToState) {
        $state.go($rootScope.returnToState, $rootScope.returnToStateParams);
      } else {
        $state.go('app.admin.dashboard');
      }
    }

    $scope.loginFormSubmit = function (email, password) {
      var token = Restangular.all('oauth/token');

      var tokenRequest = {
        grant_type: 'password',
        client_id: $rootScope.clientId,
        client_secret: $rootScope.clientSecret,
        username: email,
        password: password
      };
      $scope.loginPromise = token.post(tokenRequest);
      $scope.loginPromise.then(function (tokenResponse) {
        // Success
        $scope.wrongCredentials = false;
        // Create user object and store it in cookie
        var userObj = {
          id: tokenResponse.user_id,
          name: tokenResponse.user_name,
          username: email,
          roles: ['admin'],
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token
        };
        console.log(userObj);

        principal.authenticate(userObj);
        $rootScope.user = userObj;

        // If the user was somewhere, send them back there, now authenticated.
        if ($rootScope.returnToState) {
          $state.go($rootScope.returnToState, $rootScope.returnToStateParams);
        } else {
          // Send user to initial screen
          // TODO This state can maybe be loaded from user settings.
          $state.go('app.admin.dashboard');
        }

      }, function () {
        // Error
        $scope.wrongCredentials = true;
        $rootScope.notAuthorized = false;
      });
    };

    // Reset
    $scope.$on('$destroy', function () {
      $scope.wrongCredentials = false;
      $rootScope.notAuthorized = false;
      $rootScope.returnToState = null;
      $rootScope.returnToStateParams = null;
    });

    $('#username, #password').bind('keydown', function () {
      $scope.wrongCredentials = false;
    });
  });

// T
/*angular.module('ieventsWebApp').
 directive('showerrors', function() {
 return {
 restrict: 'A',
 require:  '^form',
 link: function (scope, el, attrs, formCtrl) {
 // find the text box element, which has the 'name' attribute
 var inputEl   = el[0].querySelector('[name]');
 // convert the native text box element to an angular element
 var inputNgEl = angular.element(inputEl);
 // get the name on the text box so we know the property to check
 // on the form controller
 var inputName = inputNgEl.attr('name');

 // only apply the has-error class after the user leaves the text box
 inputNgEl.bind('blur', function() {
 el.toggleClass('has-error', formCtrl[inputName].$invalid);
 });
 }
 };
 });
 */
