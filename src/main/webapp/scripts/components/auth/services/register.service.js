'use strict';

angular.module('hrApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


