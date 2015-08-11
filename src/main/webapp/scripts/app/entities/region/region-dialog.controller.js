'use strict';

angular.module('hrApp').controller('RegionDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Region', 'Country',
        function ($scope, $stateParams, $modalInstance, entity, Region, Country) {

            $scope.region = entity;
            $scope.countrys = Country.query();
            $scope.load = function (id) {
                Region.get({id: id}, function (result) {
                    $scope.region = result;
                });
            };

            var onSaveFinished = function (result) {
                $scope.$emit('hrApp:regionUpdate', result);
                $modalInstance.close(result);
            };

            $scope.save = function () {
                if ($scope.region.id != null) {
                    Region.update($scope.region, onSaveFinished);
                } else {
                    Region.save($scope.region, onSaveFinished);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
