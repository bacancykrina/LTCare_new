'use strict';
var app = angular.module('LTCare.reports', []);


app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/reports/clients",
                        {
                            templateUrl: "app/reports/view/clients.html",
                            controller: "clientCtrl"
                        })
                .when("/reports/hospital",
                        {
                            templateUrl: "app/reports/view/hospital.html",
                            controller: "hospitalCtrl"
                        })
                .when("/reports/sales",
                        {
                            templateUrl: "app/reports/view/sales.html",
                            controller: "salesCtrl"
                        })
                .otherwise("/404",
                        {
                            templateUrl: "app/layout/view/404.html",
                            controller: "ErrorCtrl"
                        });
    }]);
