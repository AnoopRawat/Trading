
'use strict';

import appModule = require("OnlineTrading");
import transactionModel = require("app/Transaction/model/transactionModel");
import commonModel = require("app/Common/model/commonModel");
import sharedDataService = require("app/Common/services/sharedDataService");


export class TransactionConfirmationModalController {
    private scope: transactionModel.ITransactionConfirmationModalScope= null;
    private rootScope: commonModel.IOnlineTradingRootScope = null;
    private location: ng.ILocationService = null;
    private sharedDataService: sharedDataService.SharedDataService = null;
    private uibModalInstance = null;
    // inject services
    public static $inject = ["$scope", "$rootScope", "$location", "commonService", "sharedDataService", "loginDataService", "$uibModalInstance"];
    constructor($scope: transactionModel.ITransactionConfirmationModalScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService,
        sharedDataService: sharedDataService.SharedDataService, $uibModalInstance) {
        this.scope = $scope;
        this.rootScope = $rootScope;
        this.location = $location;
        this.sharedDataService = sharedDataService;
        this.uibModalInstance = $uibModalInstance;
        $scope.headerMessage = {
            showMessage: false,
            messageText: '',
            messageType: commonModel.MessageTypeEnum.none
        };

        $scope.close = this.close;
        $scope.submit = this.submit;
    }

    // close  modal pop-up
    close = () => {
        var $uibModalInstance = this.uibModalInstance;
        $uibModalInstance.dismiss('cancel');
    }

    // submit action of modal pop-up
    submit = () => {
        var $scope = this.scope;
        var $uibModalInstance = this.uibModalInstance;
        $scope.headerMessage.showMessage = false;
        $uibModalInstance.close('submit');
    }
} 


//register TransactionConfirmationModalController Modal Controller
appModule.OnlineTrading.controllerProvider.register('TransactionConfirmationModalController',
    ($scope: transactionModel.ITransactionConfirmationModalScope, $rootScope: commonModel.IOnlineTradingRootScope, $location: ng.ILocationService,
        sharedDataService: sharedDataService.SharedDataService, $uibModalInstance) => {
        return new TransactionConfirmationModalController($scope, $rootScope, $location, sharedDataService, $uibModalInstance);
    });
 