'use strict';
import commonModel = require("app/Common/model/commonModel");

export interface ILoginControllerScope extends angular.IScope {
    startSelect: Array<string>;
    startPage: string;
    password: string;
    showModal: boolean;
    headerMessage: commonModel.IHeaderMessage;
    userCredentials: commonModel.IUserCredentials;
    redirectRegister: Function;
    login: Function;
    toggleModal: Function;
}

export interface IForgotPasswordModalScope extends angular.IScope {
    userID: string;
    hideSubmit: boolean;
    headerMessage: commonModel.IHeaderMessage;
    submit: Function;
    close: Function;
}

export interface IChangePasswordScope extends angular.IScope {
    userCredentials: commonModel.IUserCredentials;
    confirmPassword: string;
    token: string;
    headerMessage: commonModel.IHeaderMessage;
    changePassword: Function;
}

export interface IChangePasswordRouteParam extends ng.route.IRouteParamsService {
    tokenID: string;
}

export interface IChangePassword {
    token: string,
    password: string
}