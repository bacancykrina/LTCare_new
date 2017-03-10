'use strict';

var app = angular.module('LTCare.staff', ['ngTable', 'ngResource', 'toastr', 'angularjs-dropdown-multiselect']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when("/staffMembers/:paramstaffType",
                        {
                            templateUrl: "app/staffMembers/view/staffMembers.html",
                            controller: "staffMemberCtrl"
                        })
                .when("/staffMembers/staffDetail/profile/:id",
                        {
                            templateUrl: "app/staffMembers/view/staffMemberProfile.html",
                            controller: "staffMemberProfileCtrl"
                        })
                .otherwise("/404",
                        {
                            templateUrl: "app/layout/view/404.html",
                            controller: "ErrorCtrl"
                        })
    }]);