
app.controller('mdsCtrl', function ($scope, $location, $http, $rootScope, $routeParams, $window, ngTableParams, $resource) {
    $scope.mds = function (start, end, searchpatientMDSDatas) {
        $scope.loader = true;
        $scope.start = start;
        $scope.end = end;
        var start = end = "";
        if ($scope.start) {
            var d = new Date($scope.start);
            start = [(((d.getMonth() + 1) < 10) ?
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
            end = [(((d.getMonth() + 1) < 10) ?
                        '0' + parseInt(d.getMonth() + 1) :
                        parseInt(d.getMonth() + 1)),
                (((d.getDate()) < 10) ?
                        '0' + parseInt(d.getDate()) :
                        parseInt(d.getDate())),
                d.getFullYear()
            ].join('/');
        }
        var Api = $resource($rootScope.apiCallVar + 'common/data/GetPatientMDS?patientid=' + $routeParams.patientId, {}, {
            get: {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': $scope.userDetails.Token
                }
            }
        });

        $scope.patientMDSDatasTableConfig = new ngTableParams({
            page: 1,
            count: 50
        }, {
            getData: function (params) {

                var orgObj = params.url();
                // ajax request to api
                var sortingVar = "EffectiveDate_desc";
                if (Object.keys(orgObj)[2] != undefined) {
                    var fieldName = String(Object.keys(orgObj)[2]).replace('sorting[', '').replace(']', '');
                    if (fieldName != 'EffectiveDate') {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    } else {
                        sortingVar = fieldName + "_" + orgObj[Object.keys(orgObj)[2]];
                    }
                }

                var tempUrlObj = {
                    "PageNumber": orgObj.page,
                    "PageSize": orgObj.count,
                    "SearchKeyword": searchpatientMDSDatas,
                    "sorting": sortingVar,
                    "Fdate": start,
                    "Tdate": end
                };
                return Api.get(tempUrlObj).$promise.then(function (data) {
                    $scope.loader = false;
                    $scope.MDSCount = data.APICount[0].APICount;
                    params.total(data.APICount[0].APICount); // recal. page nav controls
//                    if (data.APIData != "" || data.APIData.length > 0) {
//                        $scope.noPatientMDSDataFoundRoot = true;
//                        $scope.noPatientMDSDataFound = false;
//                        $scope.PatientMDSDataFound = true;
//                        return data.APIData;
//
//                    } else {
//                        $scope.noPatientMDSDataFoundRoot = false;
//                        $scope.noPatientMDSDataFound = true;
//                        $scope.PatientMDSDataFound = false;
//                    }
                    if (searchpatientMDSDatas == '' && start == '' && end == '') {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientMDSDataFoundRoot = false;
                            $scope.noPatientMDSDataFound = true;
                        } else {
                            $scope.noPatientMDSDataFoundRoot = true;
                            $scope.PatientMDSDataFound = true;
                            $scope.noPatientMDSDataFound = false;
                        }
                    } else {
                        if (data.APICount[0].APICount == 0) {
                            $scope.noPatientMDSDataFound = true;
                            $scope.PatientMDSDataFound = false;
                        } else {
                            $scope.noPatientMDSDataFound = false;
                            $scope.PatientMDSDataFound = true;
                        }
                    }
                    return data.APIData;
                });
            }
        });
    }
    $scope.mds('','','');

})
