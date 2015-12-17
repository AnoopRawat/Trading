'use strict';
define(["require", "exports", "OnlineTrading", "app/Common/model/commonModel"], function (require, exports, appModule, commonModel) {
    var ForgotPasswordModalController = (function () {
        function ForgotPasswordModalController($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $uibModalInstance) {
            var _this = this;
            this.scope = null;
            this.rootScope = null;
            this.location = null;
            this.sharedDataService = null;
            this.commonService = null;
            this.uibModalInstance = null;
            // close forgot password modal pop-up
            this.close = function () {
                var $uibModalInstance = _this.uibModalInstance;
                $uibModalInstance.dismiss('cancel');
            };
            // submit action of forgot password modal pop-up
            this.submit = function () {
                var $scope = _this.scope;
                var commonService = _this.commonService;
                var loginDataService = _this.loginDataService;
                var $uibModalInstance = _this.uibModalInstance;
                $scope.headerMessage.showMessage = false;
                // if emailID is empty
                if (commonService.isEmpty($scope.userID)) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.forgotPasswordUserId_Error;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                }
                else {
                    // reg-ex for email checking
                    var regex = /\S+@\S+\.\S+/;
                    if (regex.test($scope.userID)) {
                        loginDataService.forgotPassword($scope.userID).then(function (data) {
                            // hide submit button, once mail sent
                            $scope.hideSubmit = true;
                            // Success message
                            $scope.headerMessage.showMessage = true;
                            $scope.headerMessage.messageText = commonModel.Constant.forgotPasswordPopUp_success;
                            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.success;
                        }, function (err) {
                            console.log(err);
                        });
                    }
                    else {
                        // error for invalid emailId
                        $scope.headerMessage.showMessage = true;
                        $scope.headerMessage.messageText = commonModel.Constant.forgotPasswordUserIdInvalid_Error;
                        $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                    }
                }
            };
            this.scope = $scope;
            this.rootScope = $rootScope;
            this.location = $location;
            this.loginDataService = loginDataService;
            this.commonService = commonService;
            this.sharedDataService = sharedDataService;
            this.uibModalInstance = $uibModalInstance;
            $scope.userID = "";
            $scope.hideSubmit = false;
            $scope.headerMessage = {
                showMessage: false,
                messageText: '',
                messageType: commonModel.MessageTypeEnum.none
            };
            $scope.close = this.close;
            $scope.submit = this.submit;
        }
        // inject services
        ForgotPasswordModalController.$inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "loginDataService", "$uibModalInstance"];
        return ForgotPasswordModalController;
    })();
    exports.ForgotPasswordModalController = ForgotPasswordModalController;
    //register ForgotPassword Modal Controller
    appModule.OnlineTrading.controllerProvider.register('ForgotPasswordModalController', function ($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $uibModalInstance) {
        return new ForgotPasswordModalController($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $uibModalInstance);
    });
});
