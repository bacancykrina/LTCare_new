/* 
 call DB
 * */
app.service('clientDBService', clientDBService);

clientDBService.$inject = ['$http', '$rootScope', '$q'];
function clientDBService($http, $rootScope, $q) {
    return {
        getDB: function () {
            console.log('getDBService service reporting for duty');
            $rootScope.roles = [];
            angular.forEach($rootScope.userDetails.selectedRoles, function(val,key){
                $rootScope.roles.push(val.Name);
            },$rootScope.roles);
            var def = $q.defer();
            $http.get($rootScope.apiCallVar + 'common/data?id=GetAllDbName&Param1=' + $rootScope.userDetails.userUniversalID + '&Param2=' + $rootScope.roles, {
                headers: {
                    'Authorization': $rootScope.userDetails.Token,
                    'Access-Control-Allow-Origin': '*'
                }}).success(function (data) {
                def.dbList = data;
                def.resolve(data);
            }).error(function () {
                def.reject("Failed to call api");
            });
            return def.promise;
        }
    };
}

