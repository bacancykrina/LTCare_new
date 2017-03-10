'use strict';
var app = angular.module('LTCare.mail', []);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/mail', {
                    templateUrl: 'app/mails/view/mail.html',
                    controller: 'mailCtrl'
                })
                .otherwise('/404', {
                    templateUrl: 'app/layout/view/404.html',
                    controller: 'ErrorCtrl'
                })
    }]);