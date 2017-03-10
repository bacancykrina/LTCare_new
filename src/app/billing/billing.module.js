'use strict';
var app = angular.module('LTCare.billing', []);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/billing/payment', {
                    templateUrl: 'app/billing/view/payment.html',
                    controller: 'billingCtrl'
                })
                .when('/billing/addpayment', {
                    templateUrl: 'app/billing/view/addpayment.html',
                    controller: 'billingCtrl'
                })
                .when('/billing/clientinvoice', {
                    templateUrl: 'app/billing/view/clientinvoice.html',
                    controller: 'billingCtrl'
                })
                .otherwise('/404', {
                    templateUrl: 'app/layout/view/404.html',
                    controller: 'ErrorCtrl'
                })
    }]);