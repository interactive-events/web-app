'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:PollCtrl
 * @description
 * # PollCtrl
 * Controller of the webAppApp
 */
angular.module('ieventsWebApp')
    .controller('PollCtrl', function ($scope, socket){
        function updatePercentages() {
            $scope.pollChart.series[0].data[1][1] = cats / (dogs + sloths + cats);
            $scope.pollChart.series[0].data[0][1] = dogs * 0.7 / (dogs + sloths + cats);
            $scope.pollChart.series[0].data[2][1] = sloths * 1.3 / (dogs + sloths + cats);
        }

        var cats = 1, dogs = 2, sloths = 4;

        socket.on('vote', function (vote) {
            if (vote.option === 0) {
                cats++;
            } else if (vote.option === 1) {
                dogs++;
            } else {
                sloths++;
            }
            updatePercentages();
        });


        $scope.pollChart = {
            title: {
                text: 'What is your favorite pet?'
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Dogs', 33.3],
                    ['Cats', 33.3],
                    ['Sloth', 33.3]
                ]
            }],
            options: {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            useHTML: true,
                            style: {fontSize: '20px'}
                        }
                    }
                }
            }
        };
    });
