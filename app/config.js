'use strict';
require.config({
    baseUrl: '/',
    paths: {
        // modules
        angular: '../scripts/angular/angular',
        ngRoute: '../scripts/angular-route',
        OnlineTrading: '../app/onlineTrading',
        ngUiBootstrap: '../scripts/ui-bootstrap-tpls-0.14.3',
        //Directives
        commonDirective: '../app/Common/directives/common-directives',
        // services
        commonService: '../app/Common/services/commonService',
        sharedDataService: '../app/Common/services/sharedDataService',
        loginDataService: '../app/Login/services/loginDataService',
        dashboardDataService: '../app/Dashboard/services/dashboardDataService',
        registerDataService: '../app/Register/services/registerDataService',
        transactionDataService: 'app/Transaction/Services/transactionDataService',
        portfolioDataService: '../app/Portfolio/services/portfolioDataService',
        //Controllers
        registerController: '../app/Register/controllers/registerController',
        dashboardController: '../app/Dashboard/controllers/dashboardController',
        portfolioController: '../app/Portfolio/controllers/portfolioController',
        loginController: '../app/Login/controllers/loginController',
        changePasswordController: '../app/Login/controllers/changePasswordController',
        forgotPasswordModalController: '../app/Login/controllers/forgotPasswordModalController',
        transactionController: '../app/Transaction/controllers/transactionController',
        transactionConfirmationModalController: '../app/Transaction/controllers/transactionConfirmationModalController',
        allStocksController: '../app/Transaction/controllers/allStocksController',
        transactionHistoryController: '../app/Transaction/controllers/transactionHistoryController',
        profitAndLossController: '../app/Transaction/controllers/profitAndLossController',
        // other dependencies
        'crypto-js': '../node_modules/crypto-js/crypto-js'
    },
    shim: {
        angular: {
            exports: 'angular',
        },
        ngRoute: {
            exports: 'ngRoute',
            deps: ['angular']
        },
        ngUiBootstrap: {
            exports: 'ngUiBootstrap',
            deps: ['angular']
        },
        commonDirective: {
            exports: 'commonDirective',
            deps: ['angular']
        }
    }
});
requirejs(['OnlineTrading', 'angular', 'ngRoute', 'ngUiBootstrap'], function (tradingApp) {
    // application initialization
    var a = new tradingApp.OnlineTrading();
    //var app = new onlineTrading.OnlineTrading();
}, function (e) {
    console.log(e);
    alert("Error in loading");
});
