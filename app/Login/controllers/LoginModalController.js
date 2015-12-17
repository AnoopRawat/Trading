'use strict';
define(["require", "exports", "OnlineTrading", "app/Common/model/commonModel"], function (require, exports, appModule, commonModel) {
    var ForgotPasswordModalController = (function () {
        function ForgotPasswordModalController($scope, $rootScope, $location, commonService, sharedDataService, $uibModalInstance) {
            var _this = this;
            this.scope = null;
            this.rootScope = null;
            this.location = null;
            this.sharedDataService = null;
            this.commonService = null;
            this.uibModalInstance = null;
            this.cancel = function () {
                var $uibModalInstance = _this.uibModalInstance;
                $uibModalInstance.dismiss('cancel');
            };
            this.ok = function () {
                var $uibModalInstance = _this.uibModalInstance;
                $uibModalInstance.dismiss('cancel');
            };
            this.scope = $scope;
            this.rootScope = $rootScope;
            this.location = $location;
            this.commonService = commonService;
            this.sharedDataService = sharedDataService;
            this.uibModalInstance = $uibModalInstance;
            $scope.headerMessage = {
                showMessage: false,
                messageText: '',
                messageType: commonModel.MessageTypeEnum.none
            };
            $scope.headerMessage.messageText = "text";
            $scope.cancel = this.cancel;
            $scope.ok = this.ok;
        }
        // inject services
        ForgotPasswordModalController.$inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "$uibModalInstance"];
        return ForgotPasswordModalController;
    })();
    exports.ForgotPasswordModalController = ForgotPasswordModalController;
    //register LoginController
    appModule.OnlineTrading.controllerProvider.register('ForgotPasswordModalController', function ($scope, $rootScope, $location, commonService, sharedDataService, $uibModalInstance) {
        return new ForgotPasswordModalController($scope, $rootScope, $location, commonService, sharedDataService, $uibModalInstance);
    });
});
