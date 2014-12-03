'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:PresentermodeviewactivityCtrl
 * @description
 * # PresentermodeviewactivityCtrl
 * Controller of the ieventsWebApp
 */

//TODO Generalize for use with different modules.
angular.module('ieventsWebApp')
    .controller('PresentermodeviewactivityCtrl', function ($scope, $state, $stateParams, Restangular) {


        /*$scope.activityPromise = Restangular.one('events/' + $stateParams.eventId + '/activities/' + $stateParams.activityId, $scope.eventId).get();
         $scope.activityPromise.then(function (data) {
         $scope.activity = data;
         });*/

        function updatePercentages() {
            $scope.pollChart.series[0].data[1][1] = cats / (dogs + sloths + cats);
            $scope.pollChart.series[0].data[0][1] = dogs * 0.7 / (dogs + sloths + cats);
            $scope.pollChart.series[0].data[2][1] = sloths * 1.3 / (dogs + sloths + cats);
        }

        $scope.activity = {
            name: 'Poll',
            customData: {
                hasVoted: true,
                eventFinished: false,
                pollDescription: {
                    question: 'What is love?',
                    answers: [
                        {id: 0, answer: 'Yes'},
                        {id: 1, answer: 'No'},
                        {id: 2, answer: 'Baby dont hurt me'}
                    ]
                },
                pollResults: {
                    numberOfVotes: 389,
                    votes: [
                        {
                            answerId: 0,
                            votes: 123
                        },
                        {
                            answerId: 1,
                            votes: 56
                        },
                        {
                            answerId: 2,
                            votes: 210
                        }
                    ]
                }
            }
        }


        var cats = 1, dogs = 2, sloths = 4;

        if ($state.is('view-activity')) {
            console.log('VOTER');
        } else {
            console.log('ADM');
        }

        //var socket = io.connect('http://interactive-events.easticbeanstalk.com/events/' + $stateParams.eventId);

        /*socket.on('vote', function (vote) {
         if (vote.option === 0) {
         cats++;
         } else if (vote.option === 1) {
         dogs++;
         } else {
         sloths++;
         }
         updatePercentages();
         });*/

        $scope.pollChart = {
            title: {
                text: $,
                style: {'fontSize': '38px'}
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Dogs', 25],
                    ['Cats', 55],
                    ['Sloth', 20]
                ]
            }],
            options: {
                chart: {
                    spacingTop: 40,
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
                        showInLegend: true,
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
