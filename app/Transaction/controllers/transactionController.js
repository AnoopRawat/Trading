define(["require", "exports", "OnlineTrading", "app/Common/model/commonModel"], function (require, exports, appModule, commonModel) {
    var TransactionController = (function () {
        function TransactionController($scope, $location, sharedDataService, transactionDataService, commonService, $filter, $uibModal) {
            var _this = this;
            this.scope = null;
            this.sharedDataService = null;
            this.location = null;
            this.commonService = null;
            this.filter = null;
            this.uibModal = null;
            this.buySellStock = function () {
                var transactionDataService = _this.transactionDataService;
                var commonService = _this.commonService;
                var $location = _this.location;
                var $scope = _this.scope;
                if (isNaN($scope.qty) || $scope.qty <= 0) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = "Incorrect quantity.";
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                }
                else {
                    transactionDataService.saveTransactionData($scope).then(function (data) {
                        if (data.status === commonModel.ServiceStatusCodeEnum.OK) {
                            $scope.headerMessage.showMessage = true;
                            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.success;
                            $scope.headerMessage.messageText = "Transcation successfully done.";
                            $scope.totalAmt = null;
                            $scope.qty = null;
                            commonService.getSummary().then(function (data) {
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
            };
            this.gotoDashboard = function () {
                var $location = _this.location;
                $location.path("/Dashboard");
            };
            this.gotoTransactionHistory = function () {
                var $location = _this.location;
                $location.path("/TransactionHistory");
            };
            this.calculateTotalAmt = function () {
                var $scope = _this.scope;
                var $filter = _this.filter;
                $scope.totalAmt = $filter('number')($scope.qty * $scope.stockData.lastTradedPrice, 2);
            };
            this.confirmTransaction = function () {
                var $scope = _this.scope;
                var $uibModal = _this.uibModal;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '../app/Transaction/html/transactionConfirmation.html',
                    controller: 'TransactionConfirmationModalController',
                    scope: $scope,
                    // size: 'lg',
                    backdrop: 'static'
                });
                modalInstance.result.then(function (selectedItem) {
                    $scope.buySellStock();
                }, function () {
                });
            };
            this.scope = $scope;
            this.sharedDataService = sharedDataService;
            this.transactionDataService = transactionDataService;
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
            commonService.getSummary().then(function (data) {
                $scope.summaryData = data.data;
            }, function (err) {
                console.log(err);
            });
            $scope.confirmTransaction = this.confirmTransaction;
        }
        TransactionController.$inject = ["$scope", "$rootScope", "sharedDataService", "transactionDataService", 'commonService', '$filter', "$uibModal"];
        return TransactionController;
    })();
    exports.TransactionController = TransactionController;
    //register TransactionController
    appModule.OnlineTrading.controllerProvider.register('TransactionController', function ($scope, $location, sharedDataService, transactionDataService, commonService, $filter, $uibModal) {
        return new TransactionController($scope, $location, sharedDataService, transactionDataService, commonService, $filter, $uibModal);
    });
});
