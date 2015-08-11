'use strict';

angular.module('hrApp')
    .controller('DepartmentDetailController', function ($scope, $rootScope, $stateParams, entity, Department, Location, Employee) {
        $scope.department = entity;
        $scope.load = function (id) {
            Department.get({id: id}, function(result) {
                $scope.department = result;
            });
        };
        $rootScope.$on('hrApp:departmentUpdate', function(event, result) {
            $scope.department = result;
        });
    });
