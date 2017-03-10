
'use strict';

var app = angular.module('LTCare.dashboard',['ngTable','ngResource','toastr','angularjs-dropdown-multiselect']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
            .when("/executive",{templateUrl:"app/dashboard/view/executive.html" , controller:"executiveCtrl"})
            .when("/administrative",{templateUrl:"app/dashboard/view/administrative.html",controller:"administrativeCtrl"})
            .when("/administrative/manageUser",{templateUrl:"app/dashboard/view/manageUser.html",controller:"manageUserCtrl"})
            .when("/administrative/manageUser/addSystemUser",{templateUrl:"app/dashboard/view/addSystemUser.html",controller:"manageUserCtrl"})
            .otherwise("/404",{templateUrl:"app/layout/view/404.html" , controller:"ErrorCtrl"})
}]);