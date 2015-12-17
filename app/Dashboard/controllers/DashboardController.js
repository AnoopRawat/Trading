'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var DashboardController = (function () {
        function DashboardController($scope, $rootScope, $location, commonService, sharedDataService, dashboardDataService, $interval, portfolioDataService) {
            var _this = this;
            this.scope = null;
            this.location = null;
            this.dashboardDataService = null;
            this.sharedDataService = null;
            this.portfolioDataService = null;
            // fetch recent transactions across users (Buy/Sell)
            this.getRecentTransactions = function () {
                var $scope = _this.scope;
                var dashboardDataService = _this.dashboardDataService;
                dashboardDataService.getRecentTransactions().then(function (data) {
                    $scope.recentTransactions = data.data;
                    console.log(data);
                }, function (err) {
                    console.log(err);
                });
            };
            this.openPortfolio = function () {
                var $location = _this.location;
                $location.path("/Portfolio");
            };
            this.seeAllStocks = function () {
                var $location = _this.location;
                $location.path("/AllStocks");
            };
            this.openTransaction = function () {
                var $location = _this.location;
                $location.path("/Transaction");
            };
            this.buySellStock = function (stockData, action) {
                var $location = _this.location;
                _this.sharedDataService.setTransactionAction(action);
                _this.sharedDataService.setStockData(stockData);
                $location.path("/Transaction");
            };
            this.gotoTransactionHistory = function () {
                var $location = _this.location;
                $location.path("/TransactionHistory");
            };
            this.scope = $scope;
            this.location = $location;
            this.dashboardDataService = dashboardDataService;
            this.sharedDataService = sharedDataService;
            this.portfolioDataService = portfolioDataService;
            $scope.refreshDate = Date.now();
            commonService.getNiftyData().then(function (data) {
                $scope.stockData = data.data;
                portfolioDataService.getUserPortfolio().then(function (portfolioData) {
                    var portfolioStockData;
                    portfolioStockData = portfolioData.data.userPortfolio;
                    angular.forEach($scope.stockData.stockData, function (stockValue, stockKey) {
                        stockValue.isActive = false;
                        angular.forEach(portfolioStockData, function (portfolioStockValue, portfolioStockkey) {
                            if (stockValue.symbol === portfolioStockValue.stockName) {
                                stockValue.isActive = true;
                            }
                        });
                    });
                }, function (err) {
                    console.log(err);
                });
            }, function (err) {
                console.log(err);
            });
            var players = { low: [], top: [] };
            players.top = ["John", "Smith", "Jack"];
            players.low = ["Eric", "Steve", "James"];
            $scope.players = players;
            // get overall user portfolio summary
            commonService.getSummary().then(function (data) {
                $scope.summaryData = data.data;
            }, function (err) {
                console.log(err);
            });
            $scope.getRecentTransactions = this.getRecentTransactions;
            $scope.openPortfolio = this.openPortfolio;
            $scope.seeAllStocks = this.seeAllStocks;
            $scope.openTransaction = this.openTransaction;
            $scope.buySellStock = this.buySellStock;
            $scope.gotoTransactionHistory = this.gotoTransactionHistory;
            // get overall recent 10 user transactions
            this.getRecentTransactions();
            // recursive call for recent transactions after every 1 minute.
            var recent = $interval(this.getRecentTransactions, 90000);
            // Make sure that the interval is destroyed too
            $scope.$on('$destroy', function () {
                $interval.cancel(recent);
            });
        }
        DashboardController.$inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "portfolioDataService"];
        return DashboardController;
    })();
    exports.DashboardController = DashboardController;
    appModule.OnlineTrading.controllerProvider.register('DashboardController', function ($scope, $rootScope, $location, commonService, sharedDataService, dashboardDataService, $interval, portfolioDataService) {
        return new DashboardController($scope, $rootScope, $location, commonService, sharedDataService, dashboardDataService, $interval, portfolioDataService);
    });
});
