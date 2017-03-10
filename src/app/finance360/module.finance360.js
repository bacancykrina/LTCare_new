'use strict';

var app = angular.module('LTCare.finance360', ['ngTable', 'ngResource', 'toastr']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/finance360/allClients",
                        {
                            templateUrl: "app/finance360/view/allClients.html",
                            controller: "finance360Ctrl"
                        })
                .when("/finance360/accounts",
                        {
                            templateUrl: "app/finance360/view/accounts.html",
                            controller: ""
                        })
                .when("/finance360/reports",
                        {
                            templateUrl: "app/finance360/view/reports.html",
                            controller: "reportCtrl"
                        })
                .otherwise("/404",
                        {
                            templateUrl: "app/layout/view/404.html",
                            controller: "ErrorCtrl"
                        })
    }]);