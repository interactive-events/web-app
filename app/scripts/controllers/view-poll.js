'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:PresentermodeviewactivityCtrl
 * @description
 * # PresentermodeviewactivityCtrl
 * Controller of the ieventsWebApp
 */

// TODO Generalize for use with different modules.
angular.module('ieventsWebApp')
    .controller('ViewPollCtrl', function ($scope, $rootScope, $state, $stateParams, Restangular) {

        $rootScope.showHeader = false;
        $scope.pollLoaded = false;

        $scope.activityPromise = Restangular.one('events', $stateParams.eventId).one('activities', $stateParams.activityId).get();
        $scope.activityPromise.then(function (data) {
            $scope.activity = data.customData;
            console.log($scope.activity);
            function populateData() {
                $scope.pollChart.series.push({
                    type: 'pie',
                    name: 'Votes',
                    data: []
                });
                var numVotes = $scope.activity.pollResults.numberOfVotes;

                /* global angular: false */
                /* angular.forEach($scope.activity.pollDescription.answers, function (value, index) {
                 var dataItem = {name: value.answer};
                 angular.forEach($scope.activity.pollResults.votes, function (value2) {
                 if (value.id.toString() === value2.answerId) {
                 console.log((value2.votes / numVotes) * 100 + '% has voted for ' + dataItem.name);
                 if (value2.votes === 0) {
                 dataItem.y = 0;
                 } else {
                 dataItem.y = parseFloat((value2.votes / numVotes) * 100);
                 }
                 dataItem.name = dataItem.name + ': ' + value2.votes;
                 }
                 });
                 $scope.pollChart.series[0].data[index] = dataItem;
                 });*/

                angular.forEach($scope.activity.pollResults.votes, function (answerVotes, index) {
                    var dataItem = {};
                    if (answerVotes.votes === 0) {
                        dataItem.y = 0;
                    } else {
                        dataItem.y = parseFloat((answerVotes.votes / numVotes) * 100);
                    }
                    angular.forEach($scope.activity.pollDescription.answers, function (answer) {
                        if (answer.id.toString() === answerVotes.answerId) {
                            dataItem.name = answer.answer + ': ' + answerVotes.votes;
                        }
                    });
                    $scope.pollChart.series[0].data[index] = dataItem;
                });

                $scope.pollLoaded = true;
            }


            if ($state.is('view-activity')) {
                console.log('VOTER');
            } else {
                console.log('ADM');
            }

            /* global io: false */
            
            var nsp = io.connect(Restangular.configuration.baseUrl+'/events/'+$stateParams.eventId+'/activities/'+$stateParams.activityId);

            nsp.on('vote', function (vote) {
                angular.forEach($scope.activity.pollResults.votes, function (value, index) {
                    if (value.answerId.toString() === vote.answerId.toString()) {
                        $scope.activity.pollResults.votes[index].votes+= 1;
                    }
                });
                populateData();
            });
            nsp.on('joined', function () {
                console.log('joined');
            });
            nsp.on('vote', function () {
                console.log('left');
            });

            /*
            var socket = io.connect(Restangular.configuration.baseUrl+'/events/' + $stateParams.eventId);
            console.log("joinging namesoace ", Restangular.configuration.baseUrl+'/events/' + $stateParams.eventId)
            console.log("joinging room", 'joinActivity'+$stateParams.activityId)    
            socket.emit('joinActivity'+$stateParams.activityId);    
            socket.on('vote', function (vote) {
                angular.forEach($scope.activity.pollResults.votes, function (value, index) {
                    if (value.id.toString() === vote.answerId) {
                        $scope.activity.pollResults.votes[index].votes+= 1;
                    }
                });
                populateData();
            });
    */
            /*$interval(function () {
                var vote = {answerId: 1};
                angular.forEach($scope.activity.pollResults.votes, function (value, index) {
                    if (value.answerId === vote.answerId) {
                        console.log('Votes', $scope.activity.pollResults.votes[index].votes);
                        $scope.activity.pollResults.votes[index].votes += 1;
                    }
                });
                populateData();
            }, 1000);*/

            $scope.pollChart = {
                title: {
                    text: $scope.activity.pollDescription.question,
                    style: {'fontSize': '38px'}
                },
                series: [],
                options: {
                    credits: false,
                    chart: {
                        spacingTop: 20,
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
                            showInLegend: true,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}',
                                useHTML: true,
                                style: {fontSize: '20px'}
                            }
                        }
                    },
                    legend: {
                        enabled: false,
                        itemStyle: {
                            fontSize: '18px',
                            layout: 'vertical'
                        },
                        itemMarginBottom: 8
                    }
                }
            };
            populateData();

            if($(window).width() < 600){
                console.log($scope.pollChart);
                $scope.pollChart.options.plotOptions.pie.dataLabels.enabled = false;
                $scope.pollChart.options.legend.enabled = true;
            }
        });
    });