'use strict'
import appModule = require("OnlineTrading");
import commonModel = require("app/Common/model/commonModel");
import sharedDataService = require("app/Common/services/sharedDataService");

export class CommonService {    
    private $q: angular.IQService = null;
    private $http: angular.IHttpService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    constructor($q: angular.IQService, $http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) {
        this.$q = $q;
        this.$http = $http;
        this.sharedDataService = sharedDataService;
    }

    // fetch overall user portfolio summary
    getSummary = () => {
        var req: ng.IRequestConfig = {
            method: 'GET',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/summary',
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: {}
        };

        return this.$http(req);
    }

    getNiftyData = () => {

        var req: ng.IRequestConfig = {
            method: 'GET',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/scheduler/niftyData',
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: {}
        };

        return this.$http(req);

        //var reponse: commonModel.NiftyResponse;
        //var promise = this.$http({
        //    method: 'GET',
        //    url: 'http://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json'
        //}).success(function (data: commonModel.NiftyResponse, status, headers, config) {
        //        return reponse = data;
        //});
        //return promise; 
    }

    isEmpty = (value : string) : boolean => {
        if (angular.isUndefined(value) || value === null) {
            return true;
        } else {
            return (value.length === 0);
        }
    }
};

// register service
appModule.OnlineTrading.serviceProvider('commonService', ($q: angular.IQService, $http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) => {
    return new CommonService($q, $http, sharedDataService);
});