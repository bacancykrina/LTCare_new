'use strict';

var app = angular.module('LTCare.admin360', ['ngTable','daterangepicker']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/admin360/census/:num', {templateUrl: 'app/admin360/view/census.html', controller: 'censusCtrl'})
                .when('/admin360/c2cSystems', {templateUrl: 'app/admin360/view/c2cSystems.html', controller: 'c2cCtrl'})
                .otherwise('/404', {templateUrl: 'app/layout/view/404.html', controller: "ErrorCtrl"})
    }]);