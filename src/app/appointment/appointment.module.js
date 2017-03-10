'use strict';
var app = angular.module('LTCare.appointment', []);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/appointment/schedule",
                        {
                            templateUrl: "app/appointment/view/schedule.html",
                            controller: "appointmentCtrl"
                        })
                .when("/appointment/bookappointment",
                        {
                            templateUrl: "app/appointment/view/bookappointment.html",
                            controller: "appointmentCtrl"
                        })
                .otherwise("/404",
                        {
                            templateUrl: "app/layout/view/404.html",
                            controller: "ErrorCtrl"
                        });
    }]);
