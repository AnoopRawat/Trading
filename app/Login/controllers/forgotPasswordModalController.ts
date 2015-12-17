
'use strict';

import appModule = require("OnlineTrading");
import CryptoJS = require("crypto-js");
import commonService = require("app/Common/services/commonService");
import commonModel = require("app/Common/model/commonModel");
import loginDataService = require("app/Login/services/loginDataService");
import sharedDataService = require("app/Common/services/sharedDataService");
import loginModel = require("app/Login/model/loginModel");

export class ForgotPasswordModalController {
    private scope: loginModel.IForgotPasswordModalScope = null;
    private rootScope: commonModel.IOnlineTradingRootScope = null;
    private location: ng.ILocationService = null;
    private loginDataService: loginDataService.LoginDataService;
    private sharedDataService: sharedDataService.SharedDataService = null;
    private commonService: commonService.CommonService = null;
    private uibModalInstance = null;
    // inject services
    public static $inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "loginDataService", "$uibModalInstance"];
    constructor($scope: loginModel.IForgotPasswordModalScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService,
        commonService: commonService.CommonService, sharedDataService: sharedDataService.SharedDataService, loginDataService: loginDataService.LoginDataService, $uibModalInstance) {
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

    // close forgot password modal pop-up
    close = () => {
        var $uibModalInstance = this.uibModalInstance;
        $uibModalInstance.dismiss('cancel');
    }

    // submit action of forgot password modal pop-up
    submit = () => {
        var $scope = this.scope;
        var commonService = this.commonService;
        var loginDataService = this.loginDataService;
        var $uibModalInstance = this.uibModalInstance;
        $scope.headerMessage.showMessage = false;
        // if emailID is empty
        if (commonService.isEmpty($scope.userID)) {
            $scope.headerMessage.showMessage = true;
            $scope.headerMessage.messageText = commonModel.Constant.forgotPasswordUserId_Error;
            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
        } else {
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
            } else {
                // error for invalid emailId
                $scope.headerMessage.showMessage = true;
                $scope.headerMessage.messageText = commonModel.Constant.forgotPasswordUserIdInvalid_Error;
                $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
            }
        }
    }
} 


//register ForgotPassword Modal Controller
appModule.OnlineTrading.controllerProvider.register('ForgotPasswordModalController',
    ($scope: loginModel.IForgotPasswordModalScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService,
        commonService: commonService.CommonService, sharedDataService: sharedDataService.SharedDataService, loginDataService: loginDataService.LoginDataService, $uibModalInstance) => {
        return new ForgotPasswordModalController($scope, $rootScope, $location, commonService, sharedDataService, loginDataService, $uibModalInstance);
    });
 