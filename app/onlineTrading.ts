'use strict';
import commonDirective = require("app/Common/directives/common-directive");
import commonModel = require("app/Common/model/commonModel");
import sharedDataService = require("app/Common/services/sharedDataService");

export class OnlineTrading {
    public static app: ng.IModule;
    public static controllerProvider: angular.IControllerProvider;
    public static serviceProvider: angular.IServiceProviderFactory;
    public static rootScope: commonModel.IOnlineTradingRootScope = null;
    public static isAuthenticated: boolean = false;
    constructor() {
        OnlineTrading.app = angular.module('OnlineTrading', ['ngRoute', 'ui.bootstrap']);
        this.initializeApp();     
        // define routing         
        this.registerRoutes(); 
        // register directive
        this.registerDirectives();
        // Manual bootstrap angular
        angular.bootstrap(document, ['OnlineTrading']);
    }

    initializeApp = () => {
        var counter = 0;
        OnlineTrading.app.run(['$rootScope', '$route', '$location',
            function ($rootScope: commonModel.IOnlineTradingRootScope, $route: ng.route.IRouteService, $location: ng.ILocationService) {
                $rootScope.$on("$routeChangeStart",
                    function (event, next, current, previous, rejection) {
                    });
                return true;
            }]);
    }

    registerDirectives = () => {
        // common directive
        OnlineTrading.app.directive("headerErrorDirective", () => {
            return new commonDirective.HeaderErrorDirective();
        });

        OnlineTrading.app.directive("numberOnlyInputDirective", () => {
            return new commonDirective.NumberOnlyInputDirective();
        });       
    };

    registerRoutes = () => {        
        // config for application
        OnlineTrading.app.config(function ($routeProvider: angular.route.IRouteProvider,
            $controllerProvider: angular.IControllerProvider, $provide, $httpProvider: angular.IHttpService) {           
            //controller provider
            OnlineTrading.controllerProvider = $controllerProvider;
            //service provider
            OnlineTrading.serviceProvider = $provide.service;
            // routing
            $routeProvider.when('/', {
                templateUrl: 'app/Login/html/login.html',
                controller: 'LoginController',
                resolve: {
                    load: ['$q', '$rootScope', '$route', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope,
                        $route: ng.route.IRouteService) {
                        var defer = $q.defer();
                        require(['loginController', 'commonService', 'loginDataService', 'sharedDataService', 'ngUiBootstrap','forgotPasswordModalController'], function () {
                            defer.resolve();
                        });
                        return defer.promise;
                    }]
                }
            }).when('/ChangePassword/:tokenID?', {
                templateUrl: 'app/Login/html/changePassword.html',
                controller: 'ChangePasswordController',
                resolve: {
                    load: ['$q', '$rootScope', '$route', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope,
                        $route: ng.route.IRouteService) {
                        var defer = $q.defer();
                        require(['changePasswordController', 'commonService', 'loginDataService', 'sharedDataService'], function () {
                            defer.resolve();
                        });
                        return defer.promise;
                    }]
                }
            }).when('/Register', {
                templateUrl: 'app/Register/html/register.html',
                controller: 'RegisterController',
                resolve: {
                    load: ['$q', '$rootScope', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope) {

                        var defer = $q.defer();
                        require(['registerController', 'registerDataService'], function () {
                            defer.resolve();
                        });
                        return defer.promise;
                    }]
                }
            }).when('/Dashboard', {
                templateUrl: 'app/Dashboard/html/dashboard.html',
                controller: 'DashboardController',
                resolve: {
                    load: ['$q', '$rootScope', '$location', '$route', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope,
                        $location: ng.ILocationService, $route: ng.route.IRouteService) {
                        var defer = $q.defer();
                        if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                require(['dashboardController', 'commonService', 'sharedDataService', 'dashboardDataService', 'portfolioDataService'], function () {
                                defer.resolve();
                            });
                        } else {
                            $location.path('/Error');
                            defer.reject();
                        }
                        return defer.promise;
                    }]
                }
            }).when('/Portfolio', {
                templateUrl: 'app/Portfolio/html/portfolio.html',
                controller: 'PortfolioController',
                resolve: {
                    load: ['$q', '$rootScope', '$location', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope,
                        $location: ng.ILocationService) {
                        var defer = $q.defer();
                        if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                            require(['portfolioController', 'portfolioDataService'], function () {
                                if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                    defer.resolve();
                                } else {
                                    defer.reject();
                                }
                            });
                        } else {
                            $location.path('/Error');
                            defer.reject();
                        }
                        return defer.promise;
                    }]
                }
            }).when('/Transaction', {
                templateUrl: 'app/Transaction/html/transaction.html',
                controller: 'TransactionController',
                resolve: {
                    load: ['$q', '$rootScope', '$location', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService, $filter: ng.IFilterService) {
                        var defer = $q.defer();
                        if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                            require(['transactionController', 'sharedDataService', 'transactionDataService', 'commonService', 'ngUiBootstrap', 'transactionConfirmationModalController'], function () {
                                defer.resolve();
                            });
                        } else {
                            $location.path('/Error');
                            defer.reject();
                        }
                        return defer.promise;
                    }]
                }
            }).when('/AllStocks', {
                templateUrl: 'app/Transaction/html/allStocks.html',
                controller: 'AllStocksController',
                resolve: {
                    load: ['$q', '$rootScope', '$location', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService) {
                        var defer = $q.defer();
                        if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                            require(['allStocksController', 'sharedDataService', 'portfolioDataService'], function () {
                                defer.resolve();
                            });
                        } else {
                            $location.path('/Error');
                            defer.reject();
                        }
                        return defer.promise;
                    }]
                }
            }).when('/TransactionHistory', {
                templateUrl: 'app/Transaction/html/transactionHistory.html',
                controller: 'TransactionHistoryController',
                resolve: {
                    load: ['$q', '$rootScope', '$location', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService) {
                        var defer = $q.defer();
                        if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                            require(['transactionHistoryController', 'sharedDataService', 'transactionDataService'], function () {
                                defer.resolve();
                            });
                        } else {
                            $location.path('/Error');
                            defer.reject();
                        }
                        return defer.promise;
                    }]
                }
            }).when('/ProfitAndLoss', {
                templateUrl: 'app/Transaction/html/profitAndLoss.html',
                controller: 'ProfitAndLossController',
                resolve: {
                    load: ['$q', '$rootScope', '$location', function ($q: angular.IQService, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService) {
                        var defer = $q.defer();
                        if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                            require(['profitAndLossController', 'sharedDataService', 'transactionDataService'], function () {
                                defer.resolve();
                            });
                        } else {
                            $location.path('/Error');
                            defer.reject();
                        }
                        return defer.promise;
                    }]
                }
            }).when('/Error', {
                templateUrl: 'app/Common/html/templates/UnauthorizeError.html'
            }).otherwise({
                redirectTo: '/'
            });
        });
    };
}
