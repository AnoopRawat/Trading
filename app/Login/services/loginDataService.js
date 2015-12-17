'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var LoginDataService = (function () {
        function LoginDataService($http, sharedDataService) {
            var _this = this;
            this.$http = null;
            this.sharedDataService = null;
            //login user
            this.loginUser = function (userCredentials) {
                var req = {
                    method: 'POST',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/token',
                    headers: {
                        'X-USER-ID': userCredentials.userId,
                        'X-USER-PASSWORD': userCredentials.password
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            // get user details
            this.getUserDetails = function (userCredentials) {
                var req = {
                    method: 'GET',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/user/' + userCredentials.userId,
                    headers: {
                        'X-AUTH-TOKEN': _this.sharedDataService.getAuthToken()
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            // forgot password modal popup submit
            this.forgotPassword = function (userID) {
                var req = {
                    method: 'POST',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/forgotPassword/' + userID,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            // change password user validation
            this.changePasswordValidate = function (token) {
                var req = {
                    method: 'POST',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/forgotPasswordValidation/' + token,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            // change password user validation
            this.changeUserPassword = function (changePasswordData) {
                var req = {
                    method: 'POST',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/changePassword/' + changePasswordData.token,
                    headers: {
                        'X-USER-PASSWORD': changePasswordData.password
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            this.$http = $http;
            this.sharedDataService = sharedDataService;
        }
        return LoginDataService;
    })();
    exports.LoginDataService = LoginDataService;
    ;
    // register service
    appModule.OnlineTrading.serviceProvider('loginDataService', function ($http, sharedDataService) {
        return new LoginDataService($http, sharedDataService);
    });
});
