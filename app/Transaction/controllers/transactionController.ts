
import appModule = require("OnlineTrading");
import sharedDataService = require("app/Common/services/sharedDataService");
import transactionModel = require("app/Transaction/model/transactionModel");
import commonModel = require("app/Common/model/commonModel");
import transactionDataService = require("app/Transaction/services/transactionDataService");
import commonService = require("app/Common/services/commonService");

export class TransactionController {

    private scope: transactionModel.ITransactionData = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    private location: ng.ILocationService = null;
    private transactionDataService: transactionDataService.TransactionDataService;
    private commonService: commonService.CommonService = null;
    private filter: ng.IFilterService = null;
    private uibModal = null;

    public static $inject = ["$scope", "$rootScope", "sharedDataService", "transactionDataService", 'commonService', '$filter', "$uibModal"];
    constructor($scope: transactionModel.ITransactionData, $location: ng.ILocationService, sharedDataService: sharedDataService.SharedDataService,
        transactionDataService: transactionDataService.TransactionDataService, commonService: commonService.CommonService, $filter: ng.IFilterService, $uibModal) {
        this.scope = $scope;
        this.sharedDataService = sharedDataService;
        this.transactionDataService = transactionDataService
        this.location = $location;
        this.commonService = commonService;
        this.filter = $filter;
        this.uibModal = $uibModal;
        $scope.headerMessage = {
            showMessage: false,
            messageText: '',
            messageType: commonModel.MessageTypeEnum.none
        };
        $scope.stockData = this.sharedDataService.getStockData();
        $scope.action = this.sharedDataService.getTransactionAction();
        this.sharedDataService.setTransactionAction("");
        $scope.refreshDate = Date.now();
        $scope.totalAmt = null;
        $scope.qty = null;
        $scope.buySellStock = this.buySellStock;
        $scope.gotoDashboard = this.gotoDashboard;
        $scope.gotoTransactionHistory = this.gotoTransactionHistory;
        $scope.calculateTotalAmt = this.calculateTotalAmt;

        commonService.getSummary().then(function (data: commonModel.IResponse) {
            $scope.summaryData = data.data;
        }, function (err) {
            console.log(err);
        });
        $scope.confirmTransaction = this.confirmTransaction;
    }

    buySellStock = () => {
        var transactionDataService = this.transactionDataService;
        var commonService = this.commonService;
        var $location = this.location;
        var $scope = this.scope;
        if (isNaN($scope.qty) || $scope.qty <= 0) {
            $scope.headerMessage.showMessage = true;
            $scope.headerMessage.messageText = "Incorrect quantity.";
            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
        } else {
            transactionDataService.saveTransactionData($scope).then(function (data: commonModel.IResponse) {
                if (data.status === commonModel.ServiceStatusCodeEnum.OK) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.success;
                    $scope.headerMessage.messageText = "Transcation successfully done.";
                    $scope.totalAmt = null;
                    $scope.qty = null;
                    commonService.getSummary().then(function (data: commonModel.IResponse) {
                        $scope.summaryData = data.data;
                    }, function (err) {
                        console.log(err);
                    });
                }
            }, function (e) {
                console.log(e);
                $scope.headerMessage.showMessage = true;
                $scope.headerMessage.messageText = e.data.message;
                $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
            });
        }
    }
    gotoDashboard = () => {
        var $location = this.location;
        $location.path("/Dashboard");
    }
    gotoTransactionHistory = () => {
        var $location = this.location;
        $location.path("/TransactionHistory");
    }
    calculateTotalAmt = () => {
        var $scope = this.scope;
        var $filter = this.filter;
        $scope.totalAmt = $filter('number')($scope.qty * $scope.stockData.lastTradedPrice, 2);
    }

    confirmTransaction = () => {
        var $scope = this.scope;
        var $uibModal = this.uibModal;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '../app/Transaction/html/transactionConfirmation.html',
            controller: 'TransactionConfirmationModalController',
            scope: $scope,
           // size: 'lg',
            backdrop: 'static'
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.buySellStock();
        }, function () {

        });
    };

}

//register TransactionController
appModule.OnlineTrading.controllerProvider.register('TransactionController', ($scope: transactionModel.ITransactionData, $location: ng.ILocationService,
    sharedDataService: sharedDataService.SharedDataService, transactionDataService: transactionDataService.TransactionDataService, commonService: commonService.CommonService,
    $filter: ng.IFilterService, $uibModal) => {
    return new TransactionController($scope, $location, sharedDataService, transactionDataService, commonService, $filter, $uibModal);
});


 