'use strict';
define(["require", "exports", "OnlineTrading", "crypto-js", "app/Common/model/commonModel"], function (require, exports, appModule, CryptoJS, commonModel) {
    var LoginController = (function () {
        function LoginController($scope, $rootScope, $location, $http, commonService, loginDataService, sharedDataService, $uibModal) {
            var _this = this;
            this.scope = null;
            this.rootScope = null;
            this.location = null;
            this.sharedDataService = null;
            this.commonService = null;
            this.uibModal = null;
            this.toggleModal = function () {
                var $scope = _this.scope;
                var $uibModal = _this.uibModal;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '../app/Login/html/forgotPassword.html',
                    controller: 'ForgotPasswordModalController',
                    scope: $scope,
                    size: 'lg',
                    backdrop: 'static'
                });
                modalInstance.result.then(function (data) {
                    console.log('modal success');
                    console.log(data);
                }, function (err) {
                    console.log('modal error');
                    console.log(err);
                });
            };
            // method for redirection
            this.menuNavigation = function (link) {
                var $location = _this.location;
                $location.path("/Dashboard");
            };
            this.redirectRegister = function () {
                var $location = _this.location;
                $location.path("/Register");
            };
            this.login = function () {
                var $scope = _this.scope;
                var $rootScope = _this.rootScope;
                var $location = _this.location;
                var loginDataService = _this.loginDataService;
                var commonService = _this.commonService;
                var sharedDataService = _this.sharedDataService;
                if (commonService.isEmpty($scope.userCredentials.userId) || commonService.isEmpty($scope.password)) {
                    $scope.headerMessage.showMessage = true;
                    $scope.headerMessage.messageText = commonModel.Constant.ErrorOnPage;
                    $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                }
                else {
                    // encoding credentials as SHA1
                    $scope.userCredentials.password = CryptoJS.SHA1($scope.password).toString();
                    // login user
                    loginDataService.loginUser($scope.userCredentials).then(function (data) {
                        if (angular.isDefined(data.data) && !commonService.isEmpty(data.data.token)) {
                            // set token   
                            sharedDataService.setAuthToken(data.data.token);
                            localStorage.setItem('isLogedIn', angular.toJson(true));
                            $rootScope.isAuthenticated = true;
                            sharedDataService.setUserId($scope.userCredentials.userId);
                            // Fetch user details
                            loginDataService.getUserDetails($scope.userCredentials).then(function (data) {
                                var fullName = data.data.fName + " " + data.data.lName;
                                sharedDataService.setUserName(fullName);
                                // set username and logout function to root scope
                                $rootScope.welcomeUserName = sharedDataService.getUserName();
                                $rootScope.logOut = function () {
                                    $rootScope.isAuthenticated = false;
                                    localStorage.clear();
                                    $location.path("/");
                                };
                            }, function (err) {
                                console.log(err);
                            });
                            // navigate as per start page
                            if ($scope.startPage === $scope.startSelect[1]) {
                                $location.path("/Portfolio");
                            }
                            else {
                                $location.path("/Dashboard");
                            }
                        }
                        else {
                            $scope.headerMessage.showMessage = true;
                            $scope.headerMessage.messageText = commonModel.Constant.InvalidLogin_Error;
                            $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                        }
                    }, function (err) {
                        $scope.headerMessage.showMessage = true;
                        $scope.headerMessage.messageText = commonModel.Constant.LoginCredentials_Error;
                        $scope.headerMessage.messageType = commonModel.MessageTypeEnum.error;
                    });
                }
            };
            this.scope = $scope;
            this.rootScope = $rootScope;
            this.location = $location;
            this.loginDataService = loginDataService;
            this.commonService = commonService;
            this.sharedDataService = sharedDataService;
            this.uibModal = $uibModal;
            $scope.password = '';
            // object to store encoded credentials
            $scope.userCredentials = {
                userId: "",
                password: ""
            };
            $scope.headerMessage = {
                showMessage: false,
                messageText: '',
                messageType: commonModel.MessageTypeEnum.none
            };
            $scope.startSelect = ['Dashboard', 'Portfolio'];
            $scope.startPage = $scope.startSelect[0];
            $scope.showModal = false;
            $scope.redirectRegister = this.redirectRegister;
            $rootScope.menuNavigation = this.menuNavigation;
            $scope.login = this.login;
            $scope.toggleModal = this.toggleModal;
            //set token as null
            this.sharedDataService.setAuthToken("");
        }
        // inject services
        LoginController.$inject = ["$scope", "$rootScope", "$location", "$http", "commonService", "loginDataService", "sharedDataService", "$uibModal"];
        return LoginController;
    })();
    exports.LoginController = LoginController;
    //register LoginController
    appModule.OnlineTrading.controllerProvider.register('LoginController', function ($scope, $rootScope, $location, $http, commonService, loginDataService, sharedDataService, $uibModal) {
        return new LoginController($scope, $rootScope, $location, $http, commonService, loginDataService, sharedDataService, $uibModal);
    });
});
