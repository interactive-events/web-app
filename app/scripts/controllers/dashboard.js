'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
  .controller('DashboardCtrl', function ($scope) {
    $scope.chart1 = {"options":{"chart":{"type":"areaspline"},"plotOptions":{"series":{"stacking":""}}},"series":[{"name":"Weekly attendees","data":[1,2,4,7,3],"id":"series-0","type":"areaspline"}],"title":{"text":""},"credits":{"enabled":false},"loading":false,"size":{"height":"300"}}
    $scope.chart2 = {"options":{"chart":{"type":"areaspline"},"plotOptions":{"series":{"stacking":""}}},"series":[{"name":"Average event rating","data":[17,2,14,8,18,14,10,5,5,9],"id":"series-7"}],"title":{"text":""},"credits":{"enabled":false},"loading":false,"size":{"width":"","height":"300"},"xAxis":{"currentMin":null}}
    });