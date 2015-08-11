'use strict';

angular.module('hrApp')
    .controller('LocationDetailController', function ($scope, $rootScope, $stateParams, entity, Location, Department, Country) {
        $scope.location = entity;
        $scope.load = function (id) {
            Location.get({id: id}, function(result) {
                $scope.location = result;
            });
        };
        $rootScope.$on('hrApp:locationUpdate', function(event, result) {
            $scope.location = result;
        });
    });
