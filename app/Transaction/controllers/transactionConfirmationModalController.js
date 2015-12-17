'use strict';
define(["require", "exports", "OnlineTrading", "app/Common/model/commonModel"], function (require, exports, appModule, commonModel) {
    var TransactionConfirmationModalController = (function () {
        function TransactionConfirmationModalController($scope, $rootScope, $location, sharedDataService, $uibModalInstance) {
            var _this = this;
            this.scope = null;
            this.rootScope = null;
            this.location = null;
            this.sharedDataService = null;
            this.uibModalInstance = null;
            // close  modal pop-up
            this.close = function () {
                var $uibModalInstance = _this.uibModalInstance;
                $uibModalInstance.dismiss('cancel');
            };
            // submit action of modal pop-up
            this.submit = function () {
                var $scope = _this.scope;
                var $uibModalInstance = _this.uibModalInstance;
                $scope.headerMessage.showMessage = false;
                $uibModalInstance.close('submit');
            };
            this.scope = $scope;
            this.rootScope = $rootScope;
            this.location = $location;
            this.sharedDataService = sharedDataService;
            this.uibModalInstance = $uibModalInstance;
            $scope.headerMessage = {
                showMessage: false,
                messageText: '',
                messageType: commonModel.MessageTypeEnum.none
            };
            $scope.close = this.close;
            $scope.submit = this.submit;
        }
        // inject services
        TransactionConfirmationModalController.$inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "loginDataService", "$uibModalInstance"];
        return TransactionConfirmationModalController;
    })();
    exports.TransactionConfirmationModalController = TransactionConfirmationModalController;
    //register TransactionConfirmationModalController Modal Controller
    appModule.OnlineTrading.controllerProvider.register('TransactionConfirmationModalController', function ($scope, $rootScope, $location, sharedDataService, $uibModalInstance) {
        return new TransactionConfirmationModalController($scope, $rootScope, $location, sharedDataService, $uibModalInstance);
    });
});
