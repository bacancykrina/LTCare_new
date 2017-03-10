'use strict';

/**
 * Main AngularJS Web Application
 */


/**
 * Init modules
 */
var app = angular.module('LTCare', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'ui.slimscroll',
    'ngTable',
    'ngResource',
    'highcharts-ng',
    'angularjs-dropdown-multiselect',
     'mwl.calendar',
    'ngStorage',
    'ngAside',
    'htmlToPlain',
    'LTCare.about',
    'LTCare.clinical',
    'LTCare.frontend',
    'LTCare.patient',
    'LTCare.dashboard',
    'LTCare.admin360',
    'LTCare.layout',
    'LTCare.finance360',
    'LTCare.financeProfile',
    'LTCare.lead',
    'LTCare.staff',
    'LTCare.reports',
    'LTCare.doctors',
    'LTCare.appointment',
    'LTCare.billing',
    'LTCare.mail',
    'LTCare.center',
    'LTCare.events'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', '$resourceProvider', function ($routeProvider, $rootScope, $resourceProvider) {
        $routeProvider
                .when("/", {templateUrl: "app/frontend/view/login.html", controller: "loginController"})
                .when("/faq", {templateUrl: "app/faq/view/faq.html", controller: "FaqCtrl"})
                .when("/pricing", {templateUrl: "app/pricing/view/pricing.html", controller: "PricingCtrl"})
                .when("/services", {templateUrl: "app/services/view/services.html", controller: "ServicesCtrl"})
                .when("/contact", {templateUrl: "app/contact/view/contact.html", controller: "ContactCtrl"})
                .when("/blog", {templateUrl: "app/blog/view/blog.html", controller: "BlogCtrl"})
                .when("/blog/post", {templateUrl: "app/blog/view/post.html", controller: "BlogCtrl"})
                .otherwise("/404", {templateUrl: "app/layout/view/404.html", controller: "ErrorCtrl"});
    }]);
// run blocks
app.run(function ($rootScope, $location, $localStorage) {
    $rootScope.userDetails = angular.fromJson($localStorage.userDetails);
    $rootScope.apiCallVar = "http://69.18.221.131/api/";
    $rootScope.srcImagePath = "http://69.18.221.129/";
    $rootScope.currentUrl = "http://69.18.221.129/";
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.currenturlpath = $location.path();
    });
});