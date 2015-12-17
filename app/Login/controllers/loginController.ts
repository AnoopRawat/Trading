'use strict';

import appModule = require("OnlineTrading");
import CryptoJS = require("crypto-js");
import commonService = require("app/Common/services/commonService");
import sharedDataService = require("app/Common/services/sharedDataService");
import loginDataService = require("app/Login/services/loginDataService");
import commonModel = require("app/Common/model/commonModel");
import loginModel = require("app/Login/model/loginModel");

export class LoginController {
    private scope: loginModel.ILoginControllerScope = null;
    private rootScope: commonModel.IOnlineTradingRootScope = null;
    private location: ng.ILocationService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    private loginDataService: loginDataService.LoginDataService;
    private commonService: commonService.CommonService = null;
    private uibModal = null;
    // inject services
    public static $inject = ["$scope", "$rootScope", "$location", "$http", "commonService", "loginDataService", "sharedDataService", "$uibModal"];
    constructor($scope: loginModel.ILoginControllerScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService, $http: ng.IHttpService,
        commonService: commonService.CommonService, loginDataService: loginDataService.LoginDataService, sharedDataService: sharedDataService.SharedDataService,
        $uibModal) {
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.location = $location;
        this.loginDataService = loginDataService;
        this.commonService = commonService;
        this.sharedDataService = sharedDataService;
        this.uibModal = $uibModal;
        $scope.password = '';
        // object to store encoded credentials
        $scope.userCredentials = {
            userId: "",
            password: ""
        };
        $scope.headerMessage = {
            showMessage: false,
            messageText: '',
            messageType: commonModel.MessageTypeEnum.none
        };
        $scope.startSelect = ['Dashboard', 'Portfolio'];
        $scope.startPage = $scope.startSelect[0];
        $scope.showModal = false;
        $scope.redirectRegister = this.redirectRegister;
        $rootScope.menuNavigation = this.menuNavigation;
        $scope.login = this.login;
        $scope.toggleModal = this.toggleModal;
        //set token as null
        this.sharedDataService.setAuthToken("");
    }

    toggleModal = () => {
        var $scope = this.scope;
        var $uibModal = this.uibModal;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '../app/Login/html/forgotPassword.html',
            controller: 'ForgotPasswordModalController',
            scope: $scope,
            size: 'lg',
            backdrop: 'static'
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });

        modalInstance.result.then(function (data) {
            console.log('modal success');
            console.log(data);
        }, function (err) {
            console.log('modal error');
            console.log(err);
        });
    };

    // method for redirection
    menuNavigation = (link: string) => {
        var $location = this.location;
        $location.path("/Dashboard");
    }

    redirectRegister = () => {
        var $location = this.location;
        $location.path("/Register");
    }


    login = () => {
        var $scope = this.scope;
        var $rootScope = this.rootScope;
        var $location = this.location;
        var loginDataService = this.loginDataService;
        var commonService = this.commonService;
        var sharedDataService = this.sharedDataService;
        if (commonService.isEmpty($scope.userCredentials.userId) || commonService.isEmpty($scope.password)) {
            $scope.headerMessage.showMessage = true;
            $scope.headerMessage.messageText = commonModel.Constant.ErrorOnPage;
            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
        } else {            
            // encoding credentials as SHA1
            $scope.userCredentials.password = CryptoJS.SHA1($scope.password).toString();
            // login user
            loginDataService.loginUser($scope.userCredentials).then(function (data: commonModel.IResponse) {
                if (angular.isDefined(data.data) && !commonService.isEmpty(data.data.token)) {
                    // set token   
                    sharedDataService.setAuthToken(data.data.token);
                    localStorage.setItem('isLogedIn', angular.toJson(true));
                    $rootScope.isAuthenticated = true;
                    sharedDataService.setUserId($scope.userCredentials.userId);  

                    // Fetch user details
                    loginDataService.getUserDetails($scope.userCredentials).then(function (data: commonModel.IResponse) {
                        var fullName: string = data.data.fName + " " + data.data.lName;
                        sharedDataService.setUserName(fullName);
                        // set username and logout function to root scope
                        $rootScope.welcomeUserName = sharedDataService.getUserName();

                        $rootScope.logOut = function () {
                            $rootScope.isAuthenticated = false;
                            localStorage.clear();
                            $location.path("/");
                        };
                    }, function (err) {
                        console.log(err);
                    });

                    // navigate as per start page
                    if ($scope.startPage === $scope.startSelect[1]) {
                        $location.path("/Portfolio");
                    } else {
                        $location.path("/Dashboard");
                    }
                } else {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.InvalidLogin_Error;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;

                }
            }, function (err: commonModel.IResponse) {
                $scope.headerMessage.showMessage = true;
                $scope.headerMessage.messageText = commonModel.Constant.LoginCredentials_Error;
                $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
            });
        }
    }
}


//register LoginController
appModule.OnlineTrading.controllerProvider.register('LoginController',
    ($scope: loginModel.ILoginControllerScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService,
        $http: ng.IHttpService, commonService: commonService.CommonService, loginDataService: loginDataService.LoginDataService,
        sharedDataService: sharedDataService.SharedDataService, $uibModal) => {
        return new LoginController($scope, $rootScope, $location, $http, commonService, loginDataService, sharedDataService, $uibModal);
    });

