'use strict';
define(["require", "exports", "OnlineTrading", "app/Common/model/commonModel", "crypto-js"], function (require, exports, appModule, commonModel, CryptoJS) {
    var RegisterController = (function () {
        function RegisterController($scope, $location, registerDataService) {
            var _this = this;
            this.scope = null;
            this.location = null;
            this.registerDataService = null;
            // Register user
            this.registerUser = function () {
                var registerDataService = _this.registerDataService;
                var $scope = _this.scope;
                if ($scope.user.userFirstName.length === 0
                    || $scope.user.userCredentials.userId.length === 0
                    || $scope.password.passwordOne.length === 0) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.Validation_Error;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                }
                else if ($scope.password.passwordOne.length > 0 && ($scope.password.passwordOne !== $scope.password.passwordTwo)) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.PasswordNotMatched_Error;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                }
                else {
                    $scope.user.userCredentials.password = CryptoJS.SHA1($scope.password.passwordTwo).toString();
                    registerDataService.registerUser($scope.user).then(function (data) {
                        if (data.status === commonModel.ServiceStatusCodeEnum.OK) {
                            $scope.headerMessage.showMessage = true;
                            $scope.headerMessage.messageText = commonModel.Constant.UserRegister_Success;
                            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.success;
                        }
                    }, function (err) {
                        console.log(err);
                        $scope.headerMessage.showMessage = true;
                        $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                        if (err.status === 417) {
                            $scope.headerMessage.messageText = commonModel.Constant.UserAlreadyRegister_Error;
                        }
                        else {
                            $scope.headerMessage.messageText = commonModel.Constant.ServiceDown_Error;
                        }
                    });
                }
            };
            // Redirect to login page
            this.redirectLogin = function () {
                var $scope = _this.scope;
                _this.location.path("/");
            };
            this.location = $location;
            this.registerDataService = registerDataService;
            this.scope = $scope;
            // assign user default data
            $scope.user = {
                userFirstName: "",
                userLastName: "",
                userCredentials: {
                    userId: "",
                    password: ""
                }
            };
            $scope.password = {
                passwordOne: "",
                passwordTwo: ""
            };
            $scope.headerMessage = {
                messageText: "",
                showMessage: false,
                messageType: commonModel.MessageTypeEnum.none
            };
            $scope.registerUser = this.registerUser;
            $scope.redirectLogin = this.redirectLogin;
        }
        return RegisterController;
    })();
    //register RegisterController
    appModule.OnlineTrading.controllerProvider.register('RegisterController', function ($scope, $location, registerDataService) {
        return new RegisterController($scope, $location, registerDataService);
    });
});
