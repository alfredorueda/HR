'use strict';

angular.module('hrApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('region', {
                parent: 'entity',
                url: '/regions',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'hrApp.region.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/region/regions.html',
                        controller: 'RegionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('region');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('region.detail', {
                parent: 'entity',
                url: '/region/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'hrApp.region.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/region/region-detail.html',
                        controller: 'RegionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('region');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Region', function ($stateParams, Region) {
                        return Region.get({id: $stateParams.id});
                    }]
                }
            })
            .state('region.new', {
                parent: 'region',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/region/region-dialog.html',
                        controller: 'RegionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {regionName: null, id: null};
                            }
                        }
                    }).result.then(function (result) {
                            $state.go('region', null, {reload: true});
                        }, function () {
                            $state.go('region');
                        })
                }]
            })
            .state('region.edit', {
                parent: 'region',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/region/region-dialog.html',
                        controller: 'RegionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Region', function (Region) {
                                return Region.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('region', null, {reload: true});
                        }, function () {
                            $state.go('^');
                        })
                }]
            });
    });
