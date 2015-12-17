'use strict';

import appModule = require("OnlineTrading");
import model = require("app/Common/model/commonModel");

export interface IHeaderErrorDirectiveScope {
    showMessage: boolean;
    messageText: string;
    closeMessage: Function;
    messageType: number;
}

export class HeaderErrorDirective implements angular.IDirective {
    constructor() {
        var directive: angular.IDirective = {};
        directive.restrict = 'A';
        directive.scope = {
            showMessage: "=",
            messageText: "=",
            messageType: "="
        };
        directive.link = function (scope: IHeaderErrorDirectiveScope) {
            scope.closeMessage = function () {
                scope.showMessage = false;
            };
        };

        directive.templateUrl = '../app/Common/html/templates/headerMessage.html';
        return directive;
    }


}

export class NumberOnlyInputDirective implements angular.IDirective {
    constructor() {
        var directive: angular.IDirective = {};
        directive.restrict='EA';
        directive.template= '<input name="inputName" ng-model="inputValue" />';
        directive.scope= {
            inputValue: '=',
            inputName: '='
        };
        directive.link = function (scope: any) {
            scope.$watch('inputValue', function (newValue: any, oldValue: any) {
                var arr = String(newValue).split("");
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        };
        return directive;
    }
}

   

//app.directive('validNumber', function () {
//    return {
//        require: '?ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {
//            if (!ngModelCtrl) {
//                return;
//            }

//            ngModelCtrl.$parsers.push(function (val) {
//                if (angular.isUndefined(val)) {
//                    var val = '';
//                }
//                var clean = val.replace(/[^0-9]+/g, '');
//                if (val !== clean) {
//                    ngModelCtrl.$setViewValue(clean);
//                    ngModelCtrl.$render();
//                }
//                return clean;
//            });

//            element.bind('keypress', function (event) {
//                if (event.keyCode === 32) {
//                    event.preventDefault();
//                }
//            });
//        }
//    };
//});
