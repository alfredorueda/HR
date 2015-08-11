'use strict';

angular.module('hrApp')
    .controller('EmployeeDetailController', function ($scope, $rootScope, $stateParams, entity, Employee, Department) {
        $scope.employee = entity;
        $scope.load = function (id) {
            Employee.get({id: id}, function (result) {
                $scope.employee = result;
            });
        };
        $rootScope.$on('hrApp:employeeUpdate', function (event, result) {
            $scope.employee = result;
        });
    });
