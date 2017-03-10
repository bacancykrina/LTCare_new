'use strict';
var app = angular.module('LTCare.frontend', []);


app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/forgotPassword", {templateUrl: "app/frontend/view/forgotPassword.html", controller: "forgotPasswordCtrl"})
                .when("/forgotUsername", {templateUrl: "app/frontend/view/forgotUsername.html", controller: "forgotUsernameCtrl"})
                .otherwise("/404", {templateUrl: "app/layout/view/404.html", controller: "ErrorCtrl"});
    }]);
