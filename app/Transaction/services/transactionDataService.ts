'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Login/model/loginModel");
import transactionModel = require("app/Transaction/model/transactionModel");
import sharedDataService = require("app/Common/services/sharedDataService");

export class TransactionDataService {
    private $http: angular.IHttpService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    constructor($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) {
        this.$http = $http;
        this.sharedDataService = sharedDataService;
    }

    //Save Transaction data
    saveTransactionData = (transactionData: transactionModel.ITransactionData) => {
        var transactionRequest: transactionModel.ITransactionDataRequest = {            
            quantity: transactionData.qty,
            stockName: transactionData.stockData.symbol,
            tradedPrice: transactionData.stockData.lastTradedPrice,
            actionType: transactionData.action,
        };
        // convert to JSON
        var jsonRequest = angular.toJson(transactionRequest);
        var req: ng.IRequestConfig = {
            method: 'POST',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction',
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: jsonRequest
        };
        return this.$http(req);
    }

    getTransactionData = () => {
        var req: ng.IRequestConfig = {
            method: 'GET',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction',
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: {}
        };
        return this.$http(req);
    }

    getProfitAndLossData = () => {
        var req: ng.IRequestConfig = {
            method: 'GET',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/plstmt',
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: {}
        };
        return this.$http(req);
    }
}

    // register service
appModule.OnlineTrading.serviceProvider('transactionDataService', ($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) => {
        return new TransactionDataService($http, sharedDataService);
    });