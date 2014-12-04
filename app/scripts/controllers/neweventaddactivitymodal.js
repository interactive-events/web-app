'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:NeweventaddactivitymodalCtrl
 * @description
 * # NeweventaddactivitymodalCtrl
 * Controller of the ieventsWebApp
 */
angular.module('ieventsWebApp')
    .controller('NeweventaddactivitymodalCtrl', function ($scope, $modalInstance) {

        $scope.modalTitle = 'Choose an activity';
        $scope.activity = false;

        $scope.modules = [
            {
                name: 'Poll',
                module: '546da619aebf240000d8a1fe',
                customData: {
                    pollDescription: {
                        answers: [
                            { id: 0 }
                        ]
                    },
                    eventFinished : false,
                    pollResults : {
                        numberOfVotes : 0,
                        votes : []
                    }
                },
                state: 'planned'
            }
        ];

        $scope.selectModule = function(){

            //TODO, Now hardcoded selecting poll, make dynamic
            $scope.activity = $scope.modules[0];
            $scope.modalTitle = 'Create the poll';
            $('#question').focus();
        };

        $scope.addAnswer = function(){
            $scope.activity.customData.pollDescription.answers.push({id: $scope.activity.customData.pollDescription.answers.length});
        };

        $scope.ok = function () {
            for(var i=0; i<$scope.activity.customData.pollDescription.answers.length; i++) {
                $scope.activity.customData.pollResults.votes.push({
                    answerId: $scope.activity.customData.pollDescription.answers[i].id,
                    votes: 0
                });
            }
            $modalInstance.close($scope.activity);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
