'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var TransactionHistoryController = (function () {
        //  public static $inject = ["$scope", "$rootScope",  "transactionDataService"];
        function TransactionHistoryController($scope, $location, transactionDataService, commonService) {
            var _this = this;
            this.scope = null;
            this.location = null;
            this.commonService = null;
            this.gotoDashboard = function () {
                var $location = _this.location;
                $location.path('/Dashboard');
            };
            this.scope = $scope;
            this.transactionDataService = transactionDataService;
            this.location = $location;
            this.commonService = commonService;
            // get overall user portfolio summary
            commonService.getSummary().then(function (data) {
                $scope.summaryData = data.data;
            }, function (err) {
                console.log(err);
            });
            //Get all transaction related data
            transactionDataService.getTransactionData().then(function (data) {
                $scope.tradingPlatformUserTransaction = data.data.tradingPlatformUserTransactions;
            }, function (e) {
                console.log(e);
            });
            $scope.gotoDashboard = this.gotoDashboard;
        }
        return TransactionHistoryController;
    })();
    exports.TransactionHistoryController = TransactionHistoryController;
    //register TransactionController
    appModule.OnlineTrading.controllerProvider.register('TransactionHistoryController', function ($scope, $location, transactionDataService, commonService) {
        return new TransactionHistoryController($scope, $location, transactionDataService, commonService);
    });
});
