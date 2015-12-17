'use strict';
define(["require", "exports", "app/Common/directives/common-directive"], function (require, exports, commonDirective) {
    var OnlineTrading = (function () {
        function OnlineTrading() {
            this.initializeApp = function () {
                var counter = 0;
                OnlineTrading.app.run(['$rootScope', '$route', '$location',
                    function ($rootScope, $route, $location) {
                        $rootScope.$on("$routeChangeStart", function (event, next, current, previous, rejection) {
                        });
                        return true;
                    }]);
            };
            this.registerDirectives = function () {
                // common directive
                OnlineTrading.app.directive("headerErrorDirective", function () {
                    return new commonDirective.HeaderErrorDirective();
                });
                OnlineTrading.app.directive("numberOnlyInputDirective", function () {
                    return new commonDirective.NumberOnlyInputDirective();
                });
            };
            this.registerRoutes = function () {
                // config for application
                OnlineTrading.app.config(function ($routeProvider, $controllerProvider, $provide, $httpProvider) {
                    //controller provider
                    OnlineTrading.controllerProvider = $controllerProvider;
                    //service provider
                    OnlineTrading.serviceProvider = $provide.service;
                    // routing
                    $routeProvider.when('/', {
                        templateUrl: 'app/Login/html/login.html',
                        controller: 'LoginController',
                        resolve: {
                            load: ['$q', '$rootScope', '$route', function ($q, $rootScope, $route) {
                                    var defer = $q.defer();
                                    require(['loginController', 'commonService', 'loginDataService', 'sharedDataService', 'ngUiBootstrap', 'forgotPasswordModalController'], function () {
                                        defer.resolve();
                                    });
                                    return defer.promise;
                                }]
                        }
                    }).when('/ChangePassword/:tokenID?', {
                        templateUrl: 'app/Login/html/changePassword.html',
                        controller: 'ChangePasswordController',
                        resolve: {
                            load: ['$q', '$rootScope', '$route', function ($q, $rootScope, $route) {
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
                            load: ['$q', '$rootScope', function ($q, $rootScope) {
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
                            load: ['$q', '$rootScope', '$location', '$route', function ($q, $rootScope, $location, $route) {
                                    var defer = $q.defer();
                                    if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                        require(['dashboardController', 'commonService', 'sharedDataService', 'dashboardDataService', 'portfolioDataService'], function () {
                                            defer.resolve();
                                        });
                                    }
                                    else {
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
                            load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
                                    var defer = $q.defer();
                                    if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                        require(['portfolioController', 'portfolioDataService'], function () {
                                            if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                                defer.resolve();
                                            }
                                            else {
                                                defer.reject();
                                            }
                                        });
                                    }
                                    else {
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
                            load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location, $filter) {
                                    var defer = $q.defer();
                                    if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                        require(['transactionController', 'sharedDataService', 'transactionDataService', 'commonService', 'ngUiBootstrap', 'transactionConfirmationModalController'], function () {
                                            defer.resolve();
                                        });
                                    }
                                    else {
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
                            load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
                                    var defer = $q.defer();
                                    if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                        require(['allStocksController', 'sharedDataService', 'portfolioDataService'], function () {
                                            defer.resolve();
                                        });
                                    }
                                    else {
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
                            load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
                                    var defer = $q.defer();
                                    if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                        require(['transactionHistoryController', 'sharedDataService', 'transactionDataService'], function () {
                                            defer.resolve();
                                        });
                                    }
                                    else {
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
                            load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
                                    var defer = $q.defer();
                                    if ($rootScope.isAuthenticated && localStorage.getItem('isLogedIn') !== null) {
                                        require(['profitAndLossController', 'sharedDataService', 'transactionDataService'], function () {
                                            defer.resolve();
                                        });
                                    }
                                    else {
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
            OnlineTrading.app = angular.module('OnlineTrading', ['ngRoute', 'ui.bootstrap']);
            this.initializeApp();
            // define routing         
            this.registerRoutes();
            // register directive
            this.registerDirectives();
            // Manual bootstrap angular
            angular.bootstrap(document, ['OnlineTrading']);
        }
        OnlineTrading.rootScope = null;
        OnlineTrading.isAuthenticated = false;
        return OnlineTrading;
    })();
    exports.OnlineTrading = OnlineTrading;
});
