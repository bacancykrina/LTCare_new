'use strict';

/**
 * Main AngularJS Web Application
 */


/**
 * Init modules
 */
var app = angular.module('LTCare.about', []);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/about", {templateUrl: "app/about/view/about.html", controller: "AboutCtrl"})
    .otherwise("/404", {templateUrl: "app/layout/view/404.html", controller: "ErrorCtrl"});
}]);
