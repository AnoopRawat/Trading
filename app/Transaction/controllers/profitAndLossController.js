'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var ProfitAndLossController = (function () {
        //  public static $inject = ["$scope", "$rootScope",  "transactionDataService"];
        function ProfitAndLossController($scope, $location, transactionDataService, commonService) {
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
            transactionDataService.getProfitAndLossData().then(function (data) {
                $scope.userRealizedTransactions = data.data.userRealizedTransactions;
            }, function (e) {
                console.log(e);
            });
            $scope.gotoDashboard = this.gotoDashboard;
        }
        return ProfitAndLossController;
    })();
    exports.ProfitAndLossController = ProfitAndLossController;
    //register TransactionController
    appModule.OnlineTrading.controllerProvider.register('ProfitAndLossController', function ($scope, $location, transactionDataService, commonService) {
        return new ProfitAndLossController($scope, $location, transactionDataService, commonService);
    });
});
