'use strict';

var app = angular.module('LTCare.clinical', ['ui.select2']);
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
//                .when("/clinical/:paramDbName/:clientType/:pageNumber", {templateUrl: "app/clinical/view/clinical.html", controller: "clinicalCtrl"})
                .when("/clinical/:paramDbName/:clientType", {templateUrl: "app/clinical/view/clinical.html", controller: "clinicalCtrl"})
                .otherwise("/404", {templateUrl: "app/layout/view/404.html", controller: "ErrorCtrl"});
    }]);
