'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('HomeCtrl', function ($scope, Restangular) {
        Restangular.setBaseUrl('http://oauthprovider/lockdin/');
        var baseToken = Restangular.all('token');

        $scope.login = function(){
            var tokenRequest = {
                "grant_type":"password",
                "client_id":"demoapp",
                "client_secret":"demopass",
                "username":"demouser",
                "password":"testpass"
            }

            baseToken.post(tokenRequest).then(function() {
                console.log("Token request OK");
            }, function() {
                console.log("Token request ERROR");
            });
        }

  });
