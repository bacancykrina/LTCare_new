/**
 * @name staffMembersService
 * @description staffMembersService is a http api call Service
 */
app.service('staffMembersService', staffMembersService);

staffMembersService.$inject = ['$http', '$rootScope', '$q'];
function staffMembersService($http, $rootScope, $q) {
    return {
        getActiveStaff: function (data) {
            console.log('staffMembersService service reporting for duty');
            var def = $q.defer();
            $http.get($rootScope.apiUrl + 'common/data?id=GetStaffLists&PageNumber=1&Pagesize=51&IsActive=1', {
                headers: {
                    'Authorization': $rootScope.userToken,
                    'Access-Control-Allow-Origin': '*'
                }}).success(function (data) {
                def.activeStaffList = data;
                def.resolve(data);
            }).error(function () {
                def.reject("Failed to call api");
            });
            return def.promise;
        },
        getInActiveStaff: function (data) {
            var def = $q.defer();
            $http.get($rootScope.apiUrl + 'common/data?id=GetStaffLists&PageNumber=1&Pagesize=51&IsActive=0', {
                headers: {
                    'Authorization': $rootScope.userToken,
                    'Access-Control-Allow-Origin': '*'
                }}).success(function (data) {
                def.inactiveStaffList = data;
                def.resolve(data);
            }).error(function () {
                def.reject("Failed to call api");
            });
            return def.promise;
        }
    };
}