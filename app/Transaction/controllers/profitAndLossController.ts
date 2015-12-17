'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Transaction/model/profitAndLossModel");
import commonModel = require("app/Common/model/commonModel");
import commonService = require("app/Common/services/commonService");
import transactionDataService = require("app/Transaction/services/transactionDataService");

export class ProfitAndLossController {

    private scope: model.IProfitAndLossScope = null;
    private location: ng.ILocationService = null;
    private transactionDataService: transactionDataService.TransactionDataService;
    private commonService: commonService.CommonService = null;

    //  public static $inject = ["$scope", "$rootScope",  "transactionDataService"];
    constructor($scope: model.IProfitAndLossScope, $location: ng.ILocationService,
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
        transactionDataService.getProfitAndLossData().then(function (data: commonModel.IResponse) {
            $scope.userRealizedTransactions = data.data.userRealizedTransactions;
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
appModule.OnlineTrading.controllerProvider.register('ProfitAndLossController', ($scope: model.IProfitAndLossScope,
    $location: ng.ILocationService, transactionDataService: transactionDataService.TransactionDataService,
    commonService: commonService.CommonService) => {
    return new ProfitAndLossController($scope, $location, transactionDataService, commonService);
});


 