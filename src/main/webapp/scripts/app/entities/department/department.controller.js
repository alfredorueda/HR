'use strict';

angular.module('hrApp')
    .controller('DepartmentController', function ($scope, Department) {
        $scope.departments = [];
        $scope.loadAll = function() {
            Department.query(function(result) {
               $scope.departments = result;
            });
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Department.get({id: id}, function(result) {
                $scope.department = result;
                $('#deleteDepartmentConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Department.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteDepartmentConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.department = {departmentName: null, id: null};
        };
    });
