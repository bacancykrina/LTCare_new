'use strict';
var app = angular.module('LTCare.events', []);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/events/eventmanagement', {
                    templateUrl: 'app/events/view/eventmanagement.html',
                    controller: 'appointmentCtrl'
                })
                .otherwise('/404', {
                    templateUrl: 'app/layout/view/404.html',
                    controller: 'ErrorCtrl'
                })
    }]);