define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var AllStocksController = (function () {
        function AllStocksController($scope, $location, commonService, sharedDataService, portfolioDataService) {
            var _this = this;
            this.scope = null;
            this.sharedDataService = null;
            this.location = null;
            this.portfolioDataService = null;
            this.openDashboard = function () {
                var $location = _this.location;
                $location.path("/Dashboard");
            };
            this.buySellStock = function (stockData, action) {
                var $location = _this.location;
                _this.sharedDataService.setTransactionAction(action);
                _this.sharedDataService.setStockData(stockData);
                $location.path("/Transaction");
            };
            this.scope = $scope;
            this.location = $location;
            this.sharedDataService = sharedDataService;
            $scope.openDashboard = this.openDashboard;
            $scope.buySellStock = this.buySellStock;
            commonService.getNiftyData().then(function (response) {
                $scope.stockData = response.data;
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
            });
        }
        AllStocksController.$inject = ["$scope", "$location", "commonService", "sharedDataService", "portfolioDataService"];
        return AllStocksController;
    })();
    exports.AllStocksController = AllStocksController;
    //register PortfolioController
    appModule.OnlineTrading.controllerProvider.register('AllStocksController', function ($scope, $location, commonService, sharedDataService, portfolioDataService) {
        return new AllStocksController($scope, $location, commonService, sharedDataService, portfolioDataService);
    });
});
