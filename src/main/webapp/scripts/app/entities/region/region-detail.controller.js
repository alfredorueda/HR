'use strict';

angular.module('hrApp')
    .controller('RegionDetailController', function ($scope, $rootScope, $stateParams, entity, Region, Country) {
        $scope.region = entity;
        $scope.load = function (id) {
            Region.get({id: id}, function (result) {
                $scope.region = result;
            });
        };
        $rootScope.$on('hrApp:regionUpdate', function (event, result) {
            $scope.region = result;
        });
    });
