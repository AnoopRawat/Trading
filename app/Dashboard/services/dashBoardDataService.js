'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var DashboardDataService = (function () {
        function DashboardDataService($http, sharedDataService) {
            var _this = this;
            this.$http = null;
            this.sharedDataService = null;
            // get all users recent transactions
            this.getRecentTransactions = function () {
                var req = {
                    method: 'GET',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/recenttxns',
                    headers: {
                        'X-AUTH-TOKEN': _this.sharedDataService.getAuthToken()
                    },
                    data: {}
                };
                return _this.$http(req);
            };
            this.$http = $http;
            this.sharedDataService = sharedDataService;
        }
        return DashboardDataService;
    })();
    exports.DashboardDataService = DashboardDataService;
    ;
    // register service
    appModule.OnlineTrading.serviceProvider('dashboardDataService', function ($http, sharedDataService) {
        return new DashboardDataService($http, sharedDataService);
    });
});
