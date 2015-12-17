'use strict';
import appModule = require("OnlineTrading");
import commonService = require("app/Common/services/commonService");
import model = require("app/Dashboard/model/dashboardModel");
import commonModel = require("app/Common/model/commonModel");
import niftyDataModel = require("app/Common/model/niftyModel");
import dashboardDataService = require("app/Dashboard/services/dashboardDataService");
import sharedDataService = require("app/Common/services/sharedDataService");
import portfolioDataService = require("app/Portfolio/services/portfolioDataService");
import portfolioModel = require("app/Portfolio/model/portfolioModel");

export class DashboardController {
    private scope: model.IDashboardScope = null;
    private location: ng.ILocationService = null;
    private dashboardDataService: dashboardDataService.DashboardDataService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    private portfolioDataService: portfolioDataService.PortfolioDataService = null;
    public static $inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService","portfolioDataService"];
    constructor($scope: model.IDashboardScope, $rootScope: commonModel.IOnlineTradingRootScope,
        $location: ng.ILocationService, commonService: commonService.CommonService, sharedDataService: sharedDataService.SharedDataService,
        dashboardDataService: dashboardDataService.DashboardDataService, $interval: ng.IIntervalService, portfolioDataService: portfolioDataService.PortfolioDataService) {
        this.scope = $scope;
        this.location = $location;
        this.dashboardDataService = dashboardDataService;
        this.sharedDataService = sharedDataService;
        this.portfolioDataService = portfolioDataService;
        $scope.refreshDate = Date.now();
        commonService.getNiftyData().then(function (data: commonModel.IResponse) {
            $scope.stockData = data.data;
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

        }, function (err) {
            console.log(err);
        });

        var players: model.IDashboardPlayers = { low: [], top: [] };
        players.top = ["John", "Smith", "Jack"]
        players.low = ["Eric", "Steve", "James"]
        $scope.players = players;
        // get overall user portfolio summary
        commonService.getSummary().then(function (data: commonModel.IResponse) {
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

    // fetch recent transactions across users (Buy/Sell)
    getRecentTransactions = () => {
        var $scope = this.scope;
        var dashboardDataService = this.dashboardDataService;
        dashboardDataService.getRecentTransactions().then(function (data: commonModel.IResponse) {
            $scope.recentTransactions = data.data;
            console.log(data);
        }, function (err) {
            console.log(err);
        });        
    }
    openPortfolio = () => {
        var $location = this.location;
        $location.path("/Portfolio");
    }
    seeAllStocks = () => {
        var $location = this.location;
        $location.path("/AllStocks");
    }
    openTransaction = () => {
        var $location = this.location;
        $location.path("/Transaction");
    }

    buySellStock = (stockData: niftyDataModel.IStockData, action:string) => {
        var $location = this.location;
        this.sharedDataService.setTransactionAction(action);
        this.sharedDataService.setStockData(stockData);
        $location.path("/Transaction");
    }
    gotoTransactionHistory = () => {
        var $location = this.location;
        $location.path("/TransactionHistory");
    }
}

appModule.OnlineTrading.controllerProvider.register('DashboardController', ($scope: model.IDashboardScope, $rootScope: commonModel.IOnlineTradingRootScope,
    $location: ng.ILocationService, commonService: commonService.CommonService, sharedDataService: sharedDataService.SharedDataService,
    dashboardDataService: dashboardDataService.DashboardDataService, $interval: ng.IIntervalService, portfolioDataService: portfolioDataService.PortfolioDataService) => {
    return new DashboardController($scope, $rootScope, $location, commonService, sharedDataService, dashboardDataService, $interval, portfolioDataService);
});


 