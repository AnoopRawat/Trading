
import appModule = require("OnlineTrading");
import commonService = require("app/Common/services/commonService");
import commonModel = require("app/Common/model/commonModel");
import allStocksModel = require("app/Transaction/model/allStocksModel");
import sharedDataService = require("app/Common/services/sharedDataService");
import portfolioDataService = require("app/Portfolio/services/portfolioDataService");
import portfolioModel = require("app/Portfolio/model/portfolioModel");
import niftyDataModel = require("app/Common/model/niftyModel");

export class AllStocksController {

    private scope: allStocksModel.IAllStockData = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    private location: ng.ILocationService = null;
    private portfolioDataService: portfolioDataService.PortfolioDataService = null;
    public static $inject = ["$scope", "$location", "commonService", "sharedDataService", "portfolioDataService"];
    constructor($scope: allStocksModel.IAllStockData, $location: ng.ILocationService, commonService: commonService.CommonService, sharedDataService: sharedDataService.SharedDataService,
        portfolioDataService: portfolioDataService.PortfolioDataService) {
        this.scope = $scope;
        this.location = $location;
        this.sharedDataService = sharedDataService;
        $scope.openDashboard = this.openDashboard;
        $scope.buySellStock = this.buySellStock;

        commonService.getNiftyData().then(function (response) {
            $scope.stockData = response.data;
            portfolioDataService.getUserPortfolio().then(function (portfolioData: commonModel.IResponse) {
                var portfolioStockData: Array<portfolioModel.IPortfolioStockData>;
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

    openDashboard = () => {
        var $location = this.location;
        $location.path("/Dashboard");
    }

    buySellStock = (stockData: niftyDataModel.IStockData, action: string) => {
        var $location = this.location;
        this.sharedDataService.setTransactionAction(action);
        this.sharedDataService.setStockData(stockData);
        $location.path("/Transaction");
    }
}

//register PortfolioController
appModule.OnlineTrading.controllerProvider.register('AllStocksController', ($scope: allStocksModel.IAllStockData, $location: ng.ILocationService, commonService: commonService.CommonService,
    sharedDataService: sharedDataService.SharedDataService, portfolioDataService: portfolioDataService.PortfolioDataService) => {
    return new AllStocksController($scope, $location, commonService, sharedDataService, portfolioDataService);
});


 