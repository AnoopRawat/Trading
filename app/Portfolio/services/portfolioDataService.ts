'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Portfolio/model/portfolioModel");
import commonModel = require("app/Common/model/commonModel");
import sharedDataService = require("app/Common/services/sharedDataService");

export class PortfolioDataService {
    private $http: angular.IHttpService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    constructor($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) {
        this.$http = $http;
        this.sharedDataService = sharedDataService;
    }
   
    // fetch user portfolio
    getUserPortfolio = () => {
        var req: ng.IRequestConfig = {
            method: 'GET',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/portfolio',
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: {}
        };

        return this.$http(req);
    }
};

// register service
appModule.OnlineTrading.serviceProvider('portfolioDataService', ($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) => {
    return new PortfolioDataService($http, sharedDataService);
});