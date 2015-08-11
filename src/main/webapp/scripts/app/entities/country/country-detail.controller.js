'use strict';

angular.module('hrApp')
    .controller('CountryDetailController', function ($scope, $rootScope, $stateParams, entity, Country, Location, Region) {
        $scope.country = entity;
        $scope.load = function (id) {
            Country.get({id: id}, function (result) {
                $scope.country = result;
            });
        };
        $rootScope.$on('hrApp:countryUpdate', function (event, result) {
            $scope.country = result;
        });
    });
