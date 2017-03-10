'use strict';
var app = angular.module('LTCare.doctors', []);


app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/doctors/alldoctors",
                        {
                            templateUrl: "app/doctors/view/allDoctors.html",
                            controller: "doctorCtrl"
                        })
                .when("/doctors/adddoctor",
                        {
                            templateUrl: "app/doctors/view/adddoctor.html",
                            controller: "doctorCtrl"
                        })
                .when("/doctors/editdoctor",
                        {
                            templateUrl: "app/doctors/view/editdoctor.html",
                            controller: "doctorCtrl"
                        })
                .when("/doctors/profile",
                        {
                            templateUrl: "app/doctors/view/profile.html",
                            controller: "doctorCtrl"
                        })
                .otherwise("/404",
                        {
                            templateUrl: "app/layout/view/404.html",
                            controller: "ErrorCtrl"
                        });
    }]);
