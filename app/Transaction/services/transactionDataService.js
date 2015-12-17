'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var TransactionDataService = (function () {
        function TransactionDataService($http, sharedDataService) {
            var _this = this;
            this.$http = null;
            this.sharedDataService = null;
            //Save Transaction data
            this.saveTransactionData = function (transactionData) {
                var transactionRequest = {
                    quantity: transactionData.qty,
                    stockName: transactionData.stockData.symbol,
                    tradedPrice: transactionData.stockData.lastTradedPrice,
                    actionType: transactionData.action,
                };
                // convert to JSON
                var jsonRequest = angular.toJson(transactionRequest);
                var req = {
                    method: 'POST',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction',
                    headers: {
                        'X-AUTH-TOKEN': _this.sharedDataService.getAuthToken()
                    },
                    data: jsonRequest
                };
                return _this.$http(req);
            };
            this.getTransactionData = function () {
                var req = {
                    method: 'GET',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction',
                    headers: {
                        'X-AUTH-TOKEN': _this.sharedDataService.getAuthToken()
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            this.getProfitAndLossData = function () {
                var req = {
                    method: 'GET',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/plstmt',
                    headers: {
                        'X-AUTH-TOKEN': _this.sharedDataService.getAuthToken()
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            this.$http = $http;
            this.sharedDataService = sharedDataService;
        }
        return TransactionDataService;
    })();
    exports.TransactionDataService = TransactionDataService;
    // register service
    appModule.OnlineTrading.serviceProvider('transactionDataService', function ($http, sharedDataService) {
        return new TransactionDataService($http, sharedDataService);
    });
});
