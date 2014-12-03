'use strict';

/**
 * @ngdoc function
 * @name ieventsWebApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ieventsWebApp
 */


function parralaxBackground(){
    var yPos = -($(window).scrollTop() / 10),
        offsetPercent = 50 - yPos,
        coords = '50% ' + offsetPercent + '%';
    // Move the background
    $('.banner').css({backgroundPosition: coords});
}

angular.module('ieventsWebApp')
    .controller('HomeCtrl', function ($scope, $rootScope) {
        console.log($rootScope.showHeader);
        setTimeout(function () {
            $('.phone').addClass('turn-on');
        }, 3000);

        $(window).scroll(parralaxBackground);

        // Clear events when controller is navigated away from
        $scope.$on('$destroy', function () {
            $(window).unbind('scroll');
        });
    });
