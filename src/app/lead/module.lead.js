'use strict';

var app = angular.module('LTCare.lead', []);
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/clinical/leaderDetail/leader Profile/:id", {templateUrl: "app/lead/view/leadProfile.html", controller: "leadProfileCtrl"})
                .otherwise("/404", {templateUrl: "app/layout/view/404.html", controller: "ErrorCtrl"});
    }]);
