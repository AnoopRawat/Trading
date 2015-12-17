'use strict';

import appModule = require("OnlineTrading");
import commonModel = require("app/Common/model/commonModel");
import registerModel = require("app/Register/model/registerModel");
import registerDataService = require("app/Register/services/registerDataService");
import CryptoJS = require("crypto-js");

class RegisterController {
    private scope: registerModel.IRegisterUserScope = null;
    private location: angular.ILocationService = null;
    private registerDataService: registerDataService.RegisterDataService = null;
    constructor($scope: registerModel.IRegisterUserScope, $location: angular.ILocationService,
        registerDataService: registerDataService.RegisterDataService) {
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
    
    // Register user
    registerUser = () => {
        var registerDataService = this.registerDataService;
        var $scope = this.scope;
        if ($scope.user.userFirstName.length === 0
            || $scope.user.userCredentials.userId.length === 0
            || $scope.password.passwordOne.length === 0) {
            $scope.headerMessage.showMessage = true;
            $scope.headerMessage.messageText = commonModel.Constant.Validation_Error;
            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
        } else if ($scope.password.passwordOne.length > 0 && ($scope.password.passwordOne !== $scope.password.passwordTwo)) {
            $scope.headerMessage.showMessage = true;
            $scope.headerMessage.messageText = commonModel.Constant.PasswordNotMatched_Error;
            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
        } else {
            $scope.user.userCredentials.password = CryptoJS.SHA1($scope.password.passwordTwo).toString();
            registerDataService.registerUser($scope.user).then(function (data: commonModel.IResponse) {
                if (data.status === commonModel.ServiceStatusCodeEnum.OK) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.UserRegister_Success;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.success;
                }
            }, function (err) {
                console.log(err);
                $scope.headerMessage.showMessage = true;
                                
                $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                if (err.status ===417) {
                    $scope.headerMessage.messageText = commonModel.Constant.UserAlreadyRegister_Error;
                   
                } else {
                    $scope.headerMessage.messageText = commonModel.Constant.ServiceDown_Error;                    
                }
            });
        }
    }

    // Redirect to login page
    redirectLogin = () => {
        var $scope = this.scope;
        this.location.path("/");
    }
}

//register RegisterController
appModule.OnlineTrading.controllerProvider.register('RegisterController', ($scope: registerModel.IRegisterUserScope, $location: ng.ILocationService, registerDataService: registerDataService.RegisterDataService) => {
    return new RegisterController($scope, $location, registerDataService);
});


