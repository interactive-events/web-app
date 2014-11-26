'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:MapmodalCtrl
 * @description
 * # MapmodalCtrl
 * Controller of the webAppApp
 */
angular.module('ieventsWebApp')
    .controller('MapmodalCtrl', function ($scope, $modalInstance, geolocation) {
        $scope.location = {};

        $scope.map = {
            center: {latitude: 40.1451, longitude: -99.6680},
            zoom: 4,
            events: {
                click: function (map, eventName, e) {
                    console.log(eventName);
                    $scope.marker.coords.latitude = e.latLng.lat();
                    $scope.marker.coords.longitude = e.latLng.lng();
                }
            },
            control: {}
        };


        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            },
            options: {draggable: true},
            events: {
                dragend: function (marker) {
                    var lat = marker.getPosition().lat();
                    var long = marker.getPosition().lng();
                    $scope.location.latitude = lat;
                    $scope.location.longitude = long;
                }
            }
        };

        geolocation.getLocation().then(function (pos) {
            $scope.map.center.latitude = pos.coords.latitude;
            $scope.map.center.longitude = pos.coords.longitude;
            $scope.marker.coords.latitude = pos.coords.latitude;
            $scope.marker.coords.longitude = pos.coords.longitude;
            $scope.map.zoom = 17;
            $scope.location.latitude = pos.coords.latitude;
            $scope.location.longitude = pos.coords.longitude;
            $scope.map.control.refresh();
        });

        $scope.ok = function () {
            $modalInstance.close($scope.location);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
