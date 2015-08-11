'use strict';

angular.module('hrApp').controller('EmployeeDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Employee', 'Department',
        function ($scope, $stateParams, $modalInstance, entity, Employee, Department) {

            $scope.employee = entity;
            $scope.departments = Department.query();
            $scope.load = function (id) {
                Employee.get({id: id}, function (result) {
                    $scope.employee = result;
                });
            };

            var onSaveFinished = function (result) {
                $scope.$emit('hrApp:employeeUpdate', result);
                $modalInstance.close(result);
            };

            $scope.save = function () {
                if ($scope.employee.id != null) {
                    Employee.update($scope.employee, onSaveFinished);
                } else {
                    Employee.save($scope.employee, onSaveFinished);
                }
            };

            $scope.clear = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);
