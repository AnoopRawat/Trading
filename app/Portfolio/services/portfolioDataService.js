'use strict';
define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var PortfolioDataService = (function () {
        function PortfolioDataService($http, sharedDataService) {
            var _this = this;
            this.$http = null;
            this.sharedDataService = null;
            // fetch user portfolio
            this.getUserPortfolio = function () {
                var req = {
                    method: 'GET',
                    url: 'http://10.127.128.77:8080/tradingplatform-war-1.0-SNAPSHOT/api/transaction/portfolio',
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
        return PortfolioDataService;
    })();
    exports.PortfolioDataService = PortfolioDataService;
    ;
    // register service
    appModule.OnlineTrading.serviceProvider('portfolioDataService', function ($http, sharedDataService) {
        return new PortfolioDataService($http, sharedDataService);
    });
});
