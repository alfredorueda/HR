'use strict';

angular.module('hrApp')
    .controller('CountryController', function ($scope, Country) {
        $scope.countrys = [];
        $scope.loadAll = function () {
            Country.query(function (result) {
                $scope.countrys = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Country.get({id: id}, function (result) {
                $scope.country = result;
                $('#deleteCountryConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Country.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteCountryConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.country = {countryName: null, id: null};
        };
    });
