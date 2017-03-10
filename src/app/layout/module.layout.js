'use strict';
var app = angular.module('LTCare.layout', []);


app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/myProfile/:checkState", {templateUrl: "app/layout/view/myProfile.html", controller: "myProfileCtrl"})
                .otherwise("/404", {templateUrl: "app/layout/view/404.html", controller: "ErrorCtrl"});
    }]);
