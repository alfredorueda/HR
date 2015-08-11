'use strict';

angular.module('hrApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('country', {
                parent: 'entity',
                url: '/countrys',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'hrApp.country.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/country/countrys.html',
                        controller: 'CountryController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('country');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('country.detail', {
                parent: 'entity',
                url: '/country/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'hrApp.country.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/country/country-detail.html',
                        controller: 'CountryDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('country');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Country', function ($stateParams, Country) {
                        return Country.get({id: $stateParams.id});
                    }]
                }
            })
            .state('country.new', {
                parent: 'country',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/country/country-dialog.html',
                        controller: 'CountryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {countryName: null, id: null};
                            }
                        }
                    }).result.then(function (result) {
                            $state.go('country', null, {reload: true});
                        }, function () {
                            $state.go('country');
                        })
                }]
            })
            .state('country.edit', {
                parent: 'country',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/country/country-dialog.html',
                        controller: 'CountryDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Country', function (Country) {
                                return Country.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('country', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            });
    });
