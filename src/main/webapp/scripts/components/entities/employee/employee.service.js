'use strict';

angular.module('hrApp')
    .factory('Employee', function ($resource, DateUtils) {
        return $resource('api/employees/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.hireDate = DateUtils.convertDateTimeFromServer(data.hireDate);
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });
    });
