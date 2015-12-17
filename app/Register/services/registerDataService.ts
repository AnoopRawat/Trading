'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Register/model/registerModel");
import commonModel = require("app/Common/model/commonModel");

export class RegisterDataService {
    private $q: angular.IQService = null;
    private $http: angular.IHttpService = null;
    constructor($q: angular.IQService, $http: angular.IHttpService) {
        this.$q = $q;
        this.$http = $http;
    }

    registerUser = (userData: commonModel.IUser) => {
        var deferred = this.$q.defer();        
        var loginUserRequest : commonModel.ILoginUserRequest = {
            userId: userData.userCredentials.userId,
            fName: userData.userFirstName,
            lName: userData.userLastName,
            email: userData.userCredentials.userId,
            roles: null,
            userPassword: userData.userCredentials.password
        };
        // convert to JSON
        var jsonRequest = angular.toJson(loginUserRequest);
        var req: ng.IRequestConfig = {
            method: 'PUT',
            url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/user',
            headers: {
                'Content-Type': 'application/json',
            },
            data: jsonRequest
        };

        return this.$http(req);
    }
};

// register service
appModule.OnlineTrading.serviceProvider('registerDataService', ($q: angular.IQService, $http: angular.IHttpService) => {
    return new RegisterDataService($q, $http);
});