'use strict';
var app = angular.module('LTCare.patient', []);
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/clinical/userDetail/:parentTab/:childTab/:patientId", {templateUrl: "app/patient/view/patient.html", controller: "patientCtrl"})
                .otherwise("/404", {templateUrl: "app/layout/view/404.html", controller: "ErrorCtrl"});
    }]);
