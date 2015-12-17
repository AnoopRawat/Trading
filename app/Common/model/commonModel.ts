'use strict';

export interface IOnlineTradingRootScope extends ng.IRootScopeService {
    welcomeUserName: string;
    isAuthenticated: boolean;
    logOut: Function;
    menuNavigation: Function;
}

export interface IHeaderMessage {
    showMessage: boolean;
    messageText: string;
    messageType: MessageTypeEnum;
}

export interface IResponse {
    status: ServiceStatusCodeEnum;
    data: any;
    statusText: string;
}

export interface IUserCredentials {
    userId: string;
    password: string;
}

export interface IUser {
    userFirstName: string;
    userLastName: string;
    userCredentials: IUserCredentials;
}

export interface ILoginUserRequest {
    userId: string,
    fName: string,
    lName: string,
    email: string,
    roles: Array<string>,
    userPassword: string
}


export interface ISummaryData {
    id: number,
    availableBal: number,
    tradedValue: number,
    totalAssetValue: number,
    netWorth: number,
    totalChangeInStockPrice: number,
    changePercentage: number
}

export enum MessageTypeEnum {
    none = 0,
    error = 1,
    success = 2,
    note = 3
}

export enum ServiceStatusCodeEnum {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404
}

export module Constant {
    // ERROR
    export const ErrorOnPage = "  Error on page.";
    export const Validation_Error = "Validation error on page.";
    export const UserAlreadyRegister_Error = "User already registered.";
    export const PasswordNotMatched_Error = "Password did not matched.";
    export const EmptyPassword_Error = "Please write password.";
    export const ServiceDown_Error = "Something went wrong, please try later.";
    export const LoginCredentials_Error = "UserId or Password did not matched.";
    export const InvalidLogin_Error = "Invalid login.";
    export const forgotPasswordUserId_Error = "Please write your UserID.";
    export const forgotPasswordUserIdInvalid_Error = "Please write a valid emailId.";
     // Message
    export const PasswordChanges_Success = "Password changed successfully.";
    export const forgotPasswordPopUp_success = "An Email has been sent to your below UserID. Please check your Inbox.";   
    export const UserRegister_Success = "User Registered Successfully.";
}