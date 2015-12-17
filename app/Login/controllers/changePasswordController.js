'use strict';
define(["require", "exports", "OnlineTrading", "app/Common/model/commonModel", "crypto-js"], function (require, exports, appModule, commonModel, CryptoJS) {
    var ChangePasswordController = (function () {
        function ChangePasswordController($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $routeParams) {
            var _this = this;
            this.scope = null;
            this.rootScope = null;
            this.location = null;
            this.sharedDataService = null;
            this.commonService = null;
            // change password
            this.changePassword = function () {
                var $scope = _this.scope;
                var commonService = _this.commonService;
                var loginDataService = _this.loginDataService;
                $scope.headerMessage.showMessage = false;
                // check if password is empty
                if (commonService.isEmpty($scope.userCredentials.password) && commonService.isEmpty($scope.confirmPassword)) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.EmptyPassword_Error;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                } // check if password did not matched
                else if ($scope.userCredentials.password !== $scope.confirmPassword) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.PasswordNotMatched_Error;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                }
                else {
                    var changePasswordData = { password: "", token: "" };
                    changePasswordData.password = CryptoJS.SHA1($scope.userCredentials.password).toString();
                    changePasswordData.token = $scope.token;
                    // send new password for change
                    loginDataService.changeUserPassword(changePasswordData).then(function (data) {
                        $scope.headerMessage.showMessage = true;
                        $scope.headerMessage.messageText = commonModel.Constant.PasswordChanges_Success;
                        $scope.headerMessage.messageType = commonModel.MessageTypeEnum.success;
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    });
                }
            };
            this.scope = $scope;
            this.rootScope = $rootScope;
            this.location = $location;
            this.commonService = commonService;
            this.loginDataService = loginDataService;
            this.sharedDataService = sharedDataService;
            $scope.headerMessage = {
                showMessage: false,
                messageText: '',
                messageType: commonModel.MessageTypeEnum.none
            };
            $scope.userCredentials = { userId: "", password: "" };
            $scope.headerMessage.messageText = "";
            $scope.token = $routeParams.tokenID;
            $scope.changePassword = this.changePassword;
            // check if token is defined
            if (!commonService.isEmpty($scope.token)) {
                // send token to API to get userID.
                loginDataService.changePasswordValidate($routeParams.tokenID).then(function (data) {
                    $scope.userCredentials.userId = data.data.userId;
                    console.log(data);
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                $location.path('/Error');
            }
        }
        // inject services
        ChangePasswordController.$inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "loginDataService", "$routeParams"];
        return ChangePasswordController;
    })();
    exports.ChangePasswordController = ChangePasswordController;
    //register ForgotPassword Modal Controller
    appModule.OnlineTrading.controllerProvider.register('ChangePasswordController', function ($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $routeParams) {
        return new ChangePasswordController($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $routeParams);
    });
});
