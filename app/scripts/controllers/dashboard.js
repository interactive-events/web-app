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
        $scope.chart1 = {
            'options': {'chart': {'type': 'areaspline'}, 'plotOptions': {'series': {'stacking': ''}}},
            'series': [{'name': 'Attendees per week', 'data': [1, 2, 4, 7, 3, 2], 'id': 'series-0', 'type': 'areaspline'}],
            'title': {'text': ''},
            'credits': {'enabled': false},
            'loading': false,
            'size': {'height': '300'},
            'yAxis': {'title': { text: 'Attendees'}},
            'xAxis': {'title': { text: 'Week'},
              categories: [
              '44',
              '45',
              '47',
              '48',
              '49',
              '50' ]
            }
        };
        $scope.chart2 = {
            'options': {'chart': {'type': 'areaspline'}, 'plotOptions': {'series': {'stacking': ''}}},
            'series': [{'name': 'Rating average of events per week', 'data': [4, 4, 5, 8, 5, 4 ], 'id': 'series-7'}],
            'title': {'text': ''},
            'credits': {'enabled': false},
            'loading': false,
            'size': {'width': '', 'height': '300'},
            'xAxis': {'currentMin': null, allowDecimals: false, 'title': { text: 'Week'},
              categories: [
                '44',
                '45',
                '47',
                '48',
                '49',
                '50' ]
            },
            'yAxis': {'title': { text: 'Rating average'}, allowDecimals: false}
        };
    });
