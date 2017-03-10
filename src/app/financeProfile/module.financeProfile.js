'use strict';

var app = angular.module('LTCare.financeProfile', ['ngTable', 'ngResource', 'toastr', 'angularjs-dropdown-multiselect']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/finance360/allClients/:fTab/:id",
                        {
                            templateUrl: "app/financeProfile/view/financeProfile.html",
                            controller: "financeProfileCtrl"
                        })
                .otherwise("/404",
                        {
                            templateUrl: "app/layout/view/404.html",
                            controller: "ErrorCtrl"
                        })
    }]);