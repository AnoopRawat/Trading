'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Portfolio/model/portfolioModel");
import commonModel = require("app/Common/model/commonModel");
import commonService = require("app/Common/services/commonService");
import portfolioDataService = require("app/Portfolio/services/portfolioDataService");

export class PortfolioController {
    private scope: model.IPortfolioScope = null;
    private location: angular.ILocationService = null;
    private portfolioDataService: portfolioDataService.PortfolioDataService = null;
    private commonService: commonService.CommonService = null;
    constructor($scope: model.IPortfolioScope, $location: ng.ILocationService, $route: ng.route.IRouteService,
        portfolioDataService: portfolioDataService.PortfolioDataService, commonService: commonService.CommonService) {
        this.scope = $scope;
        this.location = $location;
        this.portfolioDataService = portfolioDataService;
        this.commonService = commonService;
        // get overall user portfolio summary
        commonService.getSummary().then(function (data: commonModel.IResponse) {
            $scope.summaryData = data.data;
        }, function (err) {
            console.log(err);
        });
        
        // portfolio stock data
        portfolioDataService.getUserPortfolio().then(function (data: commonModel.IResponse) {
            $scope.stockData = data.data.userPortfolio;
        }, function (err) {
            console.log(err);
        });

        $scope.gotoDashboard = this.gotoDashboard;
        $scope.gotoProfitAndLoss = this.gotoProfitAndLoss;
    }

    gotoDashboard = () => {
        var $location = this.location;
        $location.path('/Dashboard');
    }
    gotoProfitAndLoss = () => {
        var $location = this.location;
        $location.path('/ProfitAndLoss');
    }
    
}

//register PortfolioController
appModule.OnlineTrading.controllerProvider.register('PortfolioController',
    ($scope: model.IPortfolioScope, $location: ng.ILocationService, $route: ng.route.IRouteService, portfolioDataService: portfolioDataService.PortfolioDataService, commonService: commonService.CommonService ) => {
        return new PortfolioController($scope, $location, $route, portfolioDataService, commonService);
    });


 