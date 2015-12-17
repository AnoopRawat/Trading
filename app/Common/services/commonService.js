'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var CommonService = (function () {
        function CommonService($q, $http, sharedDataService) {
            var _this = this;
            this.$q = null;
            this.$http = null;
            this.sharedDataService = null;
            // fetch overall user portfolio summary
            this.getSummary = function () {
                var req = {
                    method: 'GET',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/summary',
                    headers: {
                        'X-AUTH-TOKEN': _this.sharedDataService.getAuthToken()
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            this.getNiftyData = function () {
                var req = {
                    method: 'GET',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/scheduler/niftyData',
                    headers: {
                        'X-AUTH-TOKEN': _this.sharedDataService.getAuthToken()
                    },
                    data: {}
                };
                return _this.$http(req);
                //var reponse: commonModel.NiftyResponse;
                //var promise = this.$http({
                //    method: 'GET',
                //    url: 'http://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json'
                //}).success(function (data: commonModel.NiftyResponse, status, headers, config) {
                //        return reponse = data;
                //});
                //return promise; 
            };
            this.isEmpty = function (value) {
                if (angular.isUndefined(value) || value === null) {
                    return true;
                }
                else {
                    return (value.length === 0);
                }
            };
            this.$q = $q;
            this.$http = $http;
            this.sharedDataService = sharedDataService;
        }
        return CommonService;
    })();
    exports.CommonService = CommonService;
    ;
    // register service
    appModule.OnlineTrading.serviceProvider('commonService', function ($q, $http, sharedDataService) {
        return new CommonService($q, $http, sharedDataService);
    });
});
