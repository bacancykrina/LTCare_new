app.controller('claimCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, NgTableParams, $resource) {
    console.log('claimCtrl reporting for duty');

    $scope.claimDetails = function (startClaim, endClaim, searchClaim) {
        $scope.start = startClaim;
        $scope.end = endClaim;
        var startClaim = end = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            startClaim = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }

        if ($scope.end) {
            var d = new Date($scope.end);
            endClaim = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }
        $scope.loader = true;
        var claimDetailsApi = $resource($rootScope.apiCallVar + 'common/data/GetFinClaimDetailsById?patientID=' + $routeParams.id, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $rootScope.userDetails.Token
                }
            }
        });

        $scope.claimDetailsDataTableConfig = new NgTableParams({
            page: 1,
            count: 25
        }, {
            getData: function (params) {
                var orgObj1 = params.url();
                var sortingVar = "AdmDate_desc";
                if (Object.keys(orgObj1)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj1)[2]).replace('sorting[', '').replace(']', '');

                    if (fieldName != 'AdmDate') {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj1[Object.keys(orgObj1)[2]];
                    }
                }
                var tempUrlObj1 = {
                    "PageNumber": orgObj1.page,
                    "PageSize": orgObj1.count,
                    "sorting": sortingVar,
                    "SearchKeyword": searchClaim,
                    "Fdate": startClaim,
                    "Tdate": endClaim
                };
                return claimDetailsApi.get(tempUrlObj1).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.claimCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount);
                    if (data.APIData != "" || data.APIData.length > 0) {
                        $scope.noClaimDetailsFound = false;
                        $scope.ClaimDetailsFound = true;
                        return data.APIData;
                    } else {
                        $scope.noClaimDetailsFound = true;
                        $scope.ClaimDetailsFound = false;
                    }
                });
            }
        });
    }
    $scope.claimDetails('', '', '');
})