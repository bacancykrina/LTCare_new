'use strict';
var app = angular.module('LTCare.center',[]);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/centers/worldwidecenters', {
                    templateUrl: 'app/centers/view/worldwidecenter.html',
                    controller: 'worldWideCentersCtrl'
                })
                .otherwise('/404', {
                    templateUrl: 'app/layout/view/404.html',
                    controller: 'ErrorCtrl'
                })
    }]);