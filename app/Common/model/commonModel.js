'use strict';
define(["require", "exports"], function (require, exports) {
    (function (MessageTypeEnum) {
        MessageTypeEnum[MessageTypeEnum["none"] = 0] = "none";
        MessageTypeEnum[MessageTypeEnum["error"] = 1] = "error";
        MessageTypeEnum[MessageTypeEnum["success"] = 2] = "success";
        MessageTypeEnum[MessageTypeEnum["note"] = 3] = "note";
    })(exports.MessageTypeEnum || (exports.MessageTypeEnum = {}));
    var MessageTypeEnum = exports.MessageTypeEnum;
    (function (ServiceStatusCodeEnum) {
        ServiceStatusCodeEnum[ServiceStatusCodeEnum["OK"] = 200] = "OK";
        ServiceStatusCodeEnum[ServiceStatusCodeEnum["BadRequest"] = 400] = "BadRequest";
        ServiceStatusCodeEnum[ServiceStatusCodeEnum["Unauthorized"] = 401] = "Unauthorized";
        ServiceStatusCodeEnum[ServiceStatusCodeEnum["NotFound"] = 404] = "NotFound";
    })(exports.ServiceStatusCodeEnum || (exports.ServiceStatusCodeEnum = {}));
    var ServiceStatusCodeEnum = exports.ServiceStatusCodeEnum;
    var Constant;
    (function (Constant) {
        // ERROR
        Constant.ErrorOnPage = "  Error on page.";
        Constant.Validation_Error = "Validation error on page.";
        Constant.UserAlreadyRegister_Error = "User already registered.";
        Constant.PasswordNotMatched_Error = "Password did not matched.";
        Constant.EmptyPassword_Error = "Please write password.";
        Constant.ServiceDown_Error = "Something went wrong, please try later.";
        Constant.LoginCredentials_Error = "UserId or Password did not matched.";
        Constant.InvalidLogin_Error = "Invalid login.";
        Constant.forgotPasswordUserId_Error = "Please write your UserID.";
        Constant.forgotPasswordUserIdInvalid_Error = "Please write a valid emailId.";
        // Message
        Constant.PasswordChanges_Success = "Password changed successfully.";
        Constant.forgotPasswordPopUp_success = "An Email has been sent to your below UserID. Please check your Inbox.";
        Constant.UserRegister_Success = "User Registered Successfully.";
    })(Constant = exports.Constant || (exports.Constant = {}));
});
