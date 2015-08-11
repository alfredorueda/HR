'use strict';

angular.module('hrApp').controller('CountryDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Country', 'Location', 'Region',
        function ($scope, $stateParams, $modalInstance, entity, Country, Location, Region) {

            $scope.country = entity;
            $scope.locations = Location.query();
            $scope.regions = Region.query({filter: 'country-is-null'});
            $scope.load = function (id) {
                Country.get({id: id}, function (result) {
                    $scope.country = result;
                });
            };

            var onSaveFinished = function (result) {
                $scope.$emit('hrApp:countryUpdate', result);
                $modalInstance.close(result);
            };

            $scope.save = function () {
                if ($scope.country.id != null) {
                    Country.update($scope.country, onSaveFinished);
                } else {
                    Country.save($scope.country, onSaveFinished);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
