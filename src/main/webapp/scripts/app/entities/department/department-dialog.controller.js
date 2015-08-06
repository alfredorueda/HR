'use strict';

angular.module('hrApp').controller('DepartmentDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Department', 'Location',
        function($scope, $stateParams, $modalInstance, entity, Department, Location) {

        $scope.department = entity;
        $scope.locations = Location.query({filter: 'department-is-null'});
        $scope.load = function(id) {
            Department.get({id : id}, function(result) {
                $scope.department = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('hrApp:departmentUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.department.id != null) {
                Department.update($scope.department, onSaveFinished);
            } else {
                Department.save($scope.department, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
