'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Login/model/loginModel");
import commonModel = require("app/Common/model/commonModel");
import sharedDataService = require("app/Common/services/sharedDataService");

export class DashboardDataService {
    private $http: angular.IHttpService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    constructor($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) {
        this.$http = $http;
        this.sharedDataService = sharedDataService;
    }

    // get all users recent transactions
    getRecentTransactions = () => {
        var req: ng.IRequestConfig = {
            method: 'GET',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/recenttxns',
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: {}
        };
        return this.$http(req);
    }
};

// register service
appModule.OnlineTrading.serviceProvider('dashboardDataService', ($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) => {
    return new DashboardDataService($http, sharedDataService);
}); 