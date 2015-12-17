'use strict';
define(["require", "exports"], function (require, exports) {
    var HeaderErrorDirective = (function () {
        function HeaderErrorDirective() {
            var directive = {};
            directive.restrict = 'A';
            directive.scope = {
                showMessage: "=",
                messageText: "=",
                messageType: "="
            };
            directive.link = function (scope) {
                scope.closeMessage = function () {
                    scope.showMessage = false;
                };
            };
            directive.templateUrl = '../app/Common/html/templates/headerMessage.html';
            return directive;
        }
        return HeaderErrorDirective;
    })();
    exports.HeaderErrorDirective = HeaderErrorDirective;
    var NumberOnlyInputDirective = (function () {
        function NumberOnlyInputDirective() {
            var directive = {};
            directive.restrict = 'EA';
            directive.template = '<input name="inputName" ng-model="inputValue" />';
            directive.scope = {
                inputValue: '=',
                inputName: '='
            };
            directive.link = function (scope) {
                scope.$watch('inputValue', function (newValue, oldValue) {
                    var arr = String(newValue).split("");
                    if (isNaN(newValue)) {
                        scope.inputValue = oldValue;
                    }
                });
            };
            return directive;
        }
        return NumberOnlyInputDirective;
    })();
    exports.NumberOnlyInputDirective = NumberOnlyInputDirective;
});
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
