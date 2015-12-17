'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Transaction/model/transactionHistoryModel");
import commonModel = require("app/Common/model/commonModel");
import commonService = require("app/Common/services/commonService");
import transactionDataService = require("app/Transaction/services/transactionDataService");

export class TransactionHistoryController {

    private scope: model.ITransactionHistoryScope = null;
    private location: ng.ILocationService = null;
    private transactionDataService: transactionDataService.TransactionDataService;
    private commonService: commonService.CommonService = null;

  //  public static $inject = ["$scope", "$rootScope",  "transactionDataService"];
    constructor($scope: model.ITransactionHistoryScope, $location: ng.ILocationService,
        transactionDataService: transactionDataService.TransactionDataService, commonService: commonService.CommonService) {
        this.scope = $scope;
        this.transactionDataService = transactionDataService
        this.location = $location;
        this.commonService = commonService;
        // get overall user portfolio summary
        commonService.getSummary().then(function (data: commonModel.IResponse) {
            $scope.summaryData = data.data;
        }, function (err) {
            console.log(err);
        });
        //Get all transaction related data
        transactionDataService.getTransactionData().then(function (data: commonModel.IResponse) {
            $scope.tradingPlatformUserTransaction = data.data.tradingPlatformUserTransactions;
        }, function (e) {
            console.log(e);
        });

        $scope.gotoDashboard = this.gotoDashboard;
    }
    gotoDashboard = () => {
        var $location = this.location;
        $location.path('/Dashboard');
    }
}

//register TransactionController
appModule.OnlineTrading.controllerProvider.register('TransactionHistoryController', ($scope: model.ITransactionHistoryScope,
    $location: ng.ILocationService,transactionDataService: transactionDataService.TransactionDataService,
    commonService: commonService.CommonService) => {
    return new TransactionHistoryController($scope, $location, transactionDataService, commonService);
});


 