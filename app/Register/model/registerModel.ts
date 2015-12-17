'use strict';
import commonModel = require("app/Common/model/commonModel");

export interface IRegisterUserScope {
    user: commonModel.IUser;
    password: IPassword,
    headerMessage: commonModel.IHeaderMessage;
    registerUser: Function;
    redirectLogin: Function;
}

export interface IPassword {
    passwordOne: string;
    passwordTwo: string;
}


export interface IRegisterRequest {
    registerUser: commonModel.ILoginUserRequest;
} 