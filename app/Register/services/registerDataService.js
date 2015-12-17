'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var RegisterDataService = (function () {
        function RegisterDataService($q, $http) {
            var _this = this;
            this.$q = null;
            this.$http = null;
            this.registerUser = function (userData) {
                var deferred = _this.$q.defer();
                var loginUserRequest = {
                    userId: userData.userCredentials.userId,
                    fName: userData.userFirstName,
                    lName: userData.userLastName,
                    email: userData.userCredentials.userId,
                    roles: null,
                    userPassword: userData.userCredentials.password
                };
                // convert to JSON
                var jsonRequest = angular.toJson(loginUserRequest);
                var req = {
                    method: 'PUT',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/u/user',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: jsonRequest
                };
                return _this.$http(req);
            };
            this.$q = $q;
            this.$http = $http;
        }
        return RegisterDataService;
    })();
    exports.RegisterDataService = RegisterDataService;
    ;
    // register service
    appModule.OnlineTrading.serviceProvider('registerDataService', function ($q, $http) {
        return new RegisterDataService($q, $http);
    });
});
