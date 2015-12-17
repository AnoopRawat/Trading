define(["require", "exports", "OnlineTrading"], function (require, exports, appModule) {
    var SharedDataService = (function () {
        function SharedDataService() {
            var _this = this;
            this.setUserName = function (user) {
                _this.user = user;
            };
            this.getUserName = function () {
                return _this.user;
            };
            this.setAuthToken = function (authToken) {
                _this.authToken = authToken;
            };
            this.getAuthToken = function () {
                return _this.authToken;
            };
            this.setStockData = function (stock) {
                _this.stockData = stock;
            };
            this.getStockData = function () {
                return _this.stockData;
            };
            this.setTransactionAction = function (action) {
                _this.actionPerformed = action;
            };
            this.getTransactionAction = function () {
                return _this.actionPerformed;
            };
            this.setUserId = function (userId) {
                _this.userId = userId;
            };
            this.getUserId = function () {
                return _this.userId;
            };
        }
        return SharedDataService;
    })();
    exports.SharedDataService = SharedDataService;
    appModule.OnlineTrading.serviceProvider('sharedDataService', function () {
        return new SharedDataService();
    });
});
