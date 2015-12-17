'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var PortfolioController = (function () {
        function PortfolioController($scope, $location, $route, portfolioDataService, commonService) {
            var _this = this;
            this.scope = null;
            this.location = null;
            this.portfolioDataService = null;
            this.commonService = null;
            this.gotoDashboard = function () {
                var $location = _this.location;
                $location.path('/Dashboard');
            };
            this.gotoProfitAndLoss = function () {
                var $location = _this.location;
                $location.path('/ProfitAndLoss');
            };
            this.scope = $scope;
            this.location = $location;
            this.portfolioDataService = portfolioDataService;
            this.commonService = commonService;
            // get overall user portfolio summary
            commonService.getSummary().then(function (data) {
                $scope.summaryData = data.data;
            }, function (err) {
                console.log(err);
            });
            // portfolio stock data
            portfolioDataService.getUserPortfolio().then(function (data) {
                $scope.stockData = data.data.userPortfolio;
            }, function (err) {
                console.log(err);
            });
            $scope.gotoDashboard = this.gotoDashboard;
            $scope.gotoProfitAndLoss = this.gotoProfitAndLoss;
        }
        return PortfolioController;
    })();
    exports.PortfolioController = PortfolioController;
    //register PortfolioController
    appModule.OnlineTrading.controllerProvider.register('PortfolioController', function ($scope, $location, $route, portfolioDataService, commonService) {
        return new PortfolioController($scope, $location, $route, portfolioDataService, commonService);
    });
});
