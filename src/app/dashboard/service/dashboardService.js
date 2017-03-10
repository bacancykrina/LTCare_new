(function () {
    'use strict';
    /**
     * @name dashboardService
     * @description dashboardService is a http api call Service
     */
    angular.module('LTCare')
           .service('dashboardService', dashboardService);
   
    dashboardService.$inject = ['$http', '$rootScope', '$q'];
    function dashboardService($http, $rootScope, $q) {
        return {
                getActiveStaff: function(data) {
                    var def = $q.defer();
                    $http.get($rootScope.apiUrl+'common/data?id=GetStaffLists&PageNumber=1&Pagesize=51&IsActive=0')
                        .success(function(data) {
                            def.resolve(data);
                        })
                        .error(function() {
                            def.reject("Failed to get albums");
                        });
                    return def.promise;
                    
                    $http({
                    method: 'GET',
                    url: url,
                    contentType: 'application/x-www-form-urlencoded',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': $rootScope.userToken
                    }
                }).success(function (responseData, status, headers, config) {

                }).error(function (responseData, status, headers, config) {

                });
            }
        };
    }
});