'use strict';

angular.module('hrApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
