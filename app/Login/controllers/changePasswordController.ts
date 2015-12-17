'use strict';

import appModule = require("OnlineTrading");
import commonService = require("app/Common/services/commonService");
import commonModel = require("app/Common/model/commonModel");
import CryptoJS = require("crypto-js");
import loginDataService = require("app/Login/services/loginDataService");
import sharedDataService = require("app/Common/services/sharedDataService");
import loginModel = require("app/Login/model/loginModel");

export class ChangePasswordController {
    private scope: loginModel.IChangePasswordScope = null;
    private rootScope: commonModel.IOnlineTradingRootScope = null;
    private location: ng.ILocationService = null;
    private loginDataService: loginDataService.LoginDataService;
    private sharedDataService: sharedDataService.SharedDataService = null;
    private commonService: commonService.CommonService = null;

    // inject services
    public static $inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "loginDataService", "$routeParams"];
    constructor($scope: loginModel.IChangePasswordScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService,
        commonService: commonService.CommonService, sharedDataService: sharedDataService.SharedDataService, loginDataService: loginDataService.LoginDataService,
        $routeParams: loginModel.IChangePasswordRouteParam) {
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
            loginDataService.changePasswordValidate($routeParams.tokenID).then(function (data: commonModel.IResponse) {
                $scope.userCredentials.userId = data.data.userId;
                console.log(data);
            }, function (err) {
                console.log(err);
            });
        } else {
            $location.path('/Error');
        }
    }

    // change password
    changePassword = () => {
        var $scope = this.scope;
        var commonService = this.commonService;
        var loginDataService = this.loginDataService;
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
        } else {
            var changePasswordData: loginModel.IChangePassword = { password: "", token: "" };
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
    }
} 


//register ForgotPassword Modal Controller
appModule.OnlineTrading.controllerProvider.register('ChangePasswordController',
    ($scope: loginModel.IChangePasswordScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService,
        commonService: commonService.CommonService, sharedDataService: sharedDataService.SharedDataService,
        loginDataService: loginDataService.LoginDataService, $routeParams: loginModel.IChangePasswordRouteParam) => {
        return new ChangePasswordController($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $routeParams);
    });
 