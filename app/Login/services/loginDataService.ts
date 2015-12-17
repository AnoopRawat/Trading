'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Login/model/loginModel");
import commonModel = require("app/Common/model/commonModel");
import sharedDataService = require("app/Common/services/sharedDataService");

export class LoginDataService {
    private $http: angular.IHttpService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    constructor($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) {
        this.$http = $http;
        this.sharedDataService = sharedDataService;
    }
   
    //login user
    loginUser = (userCredentials: commonModel.IUserCredentials) => {
        var req: ng.IRequestConfig = {
            method: 'POST',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/token',
            headers: {
                'X-USER-ID': userCredentials.userId,
                'X-USER-PASSWORD': userCredentials.password
            },
            data: {}
        };
        return this.$http(req);
    }

    // get user details
    getUserDetails = (userCredentials: commonModel.IUserCredentials) => {
        var req: ng.IRequestConfig = {
            method: 'GET',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/user/' + userCredentials.userId,
            headers: {
                'X-AUTH-TOKEN': this.sharedDataService.getAuthToken()
            },
            data: {}
        };
        return this.$http(req);
    }

    // forgot password modal popup submit
    forgotPassword = (userID: string) => {
        var req: ng.IRequestConfig = {
            method: 'POST',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/forgotPassword/' + userID,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        };
        return this.$http(req);
    }

    // change password user validation
    changePasswordValidate = (token: string) => {
        var req: ng.IRequestConfig = {
            method: 'POST',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/forgotPasswordValidation/' + token,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        };
        return this.$http(req);
    }

    // change password user validation
    changeUserPassword = (changePasswordData: model.IChangePassword) => {
        var req: ng.IRequestConfig = {
            method: 'POST',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/changePassword/' + changePasswordData.token,
            headers: {
                'X-USER-PASSWORD': changePasswordData.password
            },
            data: {}
        };
        return this.$http(req);
    }
};

// register service
appModule.OnlineTrading.serviceProvider('loginDataService', ($http: angular.IHttpService, sharedDataService: sharedDataService.SharedDataService) => {
    return new LoginDataService($http, sharedDataService);
});