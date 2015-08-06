/* globals $ */
'use strict';

angular.module('hrApp')
    .directive('hrAppPagination', function() {
        return {
            templateUrl: 'scripts/components/form/pagination.html'
        };
    });
